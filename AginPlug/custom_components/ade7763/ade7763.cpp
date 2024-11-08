#include "ade7763.h"

#include "esphome/core/log.h"
#include <cmath>
namespace esphome {
namespace ade7763 {

static const char *TAG = "ade7763";

// Based on Adafruit's library: https://github.com/adafruit/Adafruit_ADE7763

void ADE7763Sensor::setup() {
	unsigned int    ui;
	unsigned char   uc;

	//ESP_LOGCONFIG(TAG, "Setting up ADE7763Sensor");
	this->spi_setup();
	/* Reset the ADE */
	reset_pin_->pin_mode(gpio::FLAG_OUTPUT);     // Now set the resetPowerDownPin as digital output.
	reset_pin_->digital_write(LOW);   // Make sure we have a clean LOW state.
	delay(20);
	reset_pin_->digital_write(HIGH);
	delay(20);

	/* Perform a software reset */
	ui = ADE_read  (MR_MODE, MR_MODE_CNT);
	ui |= MODE_SWRST;
	ADE_write (MR_MODE, ui, MR_MODE_CNT);
	delayMicroseconds (200); // Wait for reset to take effect

	/* Get die version */
	uc = ADE_read (MR_DIEREV, MR_DIEREV_CNT);

	/* Write to Mode register */
	ui = 0x00 |
		//MODE_DISHPF    |   // Disable HPF in Channel 1
		//MODE_DISLPF2   |   // Disable LPF after the multiplier (LPF2)
		MODE_DISCF     |   // Disable frequency output
		MODE_DISSAG    |   // Disable line voltage sag detection
		//MODE_ASUSPEND  |   // Disable A/D converters
		//MODE_TEMPSEL   |   // Start temperature conversion
		//MODE_SWRST     |   // Software Chip Reset.
		//MODE_CYCMODE   |   // Enable line cycle accumulation mode
		//MODE_DISCH1    |   // Short out Chan1 (Current)
		//MODE_DISCH2    |   // Short out Chan2 (Voltage)
		//MODE_SWAP      |   // Swap Chan1 and Chan2
		//MODE_DTRT_3K5  |   // Waverform data rate to 3.5ksps
		MODE_WAV_POWER |   // Sample active power
		//MODE_POAM      |   // Accumulated positive power only
		0x00;

	/* Set the mode */
	ADE_write (MR_MODE, ui, MR_MODE_CNT);

	/* Write to interrupt enable register */
	ui = IRQ_NONE;
	ADE_write (MR_IRQEN, ui, MR_IRQEN_CNT);

	/* Reset interrupt status (with reset) */
	ui = ADE_read (MR_RSTIRQ, MR_RSTIRQ_CNT);

	/* Set up the gain register */
	uc = 0x00;  // ADC1,2 gain = 1 full scale range is +-0.5V
	ADE_write (MR_GAIN, uc, MR_GAIN_CNT);

	/* Set up the offset correction for ADC1 */
	uc = 0x00;
	ADE_write (MR_CH1OS, uc, MR_CH1OS_CNT);

	/* Set up the offset correction for ADC2 */
	uc = 0x00;
	ADE_write (MR_CH2OS, uc, MR_CH2OS_CNT);

	delay(20);

	last_power = ADE_read(MR_AENERGY, MR_AENERGY_CNT);
	last_time = millis();

	//ESP_LOGCONFIG(TAG, "Completed setting up ADE7763Sensor",);
}

void ADE7763Sensor::dump_config() {
	//LOG_SENSOR("", "ADE7763", this);
	LOG_PIN("  CS Pin: ", this->cs_);
	//ESP_LOGCONFIG(TAG, "  Mains Filter: %s",(filter_ == FILTER_60HZ ? "60 Hz" : (filter_ == FILTER_50HZ ? "50 Hz" : "Unknown!")));
	LOG_UPDATE_INTERVAL(this);
}

void ADE7763Sensor::resetPeaks(void) 
{
	volatile uint32_t  ul;
	ul = ADE_read(MR_RAENERGY,  MR_RAENERGY_CNT);
	ul = ADE_read(MR_RVAENERGY, MR_RVAENERGY_CNT);
	ul = ADE_read(MR_RSTIRQ, MR_RSTIRQ_CNT);
	ul = ADE_read(MR_RSTIPEAK, MR_RSTIPEAK_CNT);
	ul = ADE_read(MR_RSTVPEAK, MR_RSTVPEAK_CNT);
}

void ADE7763Sensor::setInterrupt(unsigned int interrupt)
{
	volatile uint32_t  ui;
	
	/* Write to interrupt enable register */
	ADE_write (MR_IRQEN, interrupt, MR_IRQEN_CNT);

	/* Reset interrupt status (with reset) */
	ui = ADE_read (MR_RSTIRQ, MR_RSTIRQ_CNT);
	/* At this we will respond to the interrupt requested */
}


void ADE7763Sensor::update() 
{
	uint32_t ul;
	float r;
	ESP_LOGVV(TAG, "update");

	if (current_sensor_) {
		ul = ADE_read(MR_IRMS, MR_IRMS_CNT);
		r = ul;
		r/=13790.0f;
		// r/=100000.0f;
		current_sensor_->publish_state(r);
	}
	if (voltage_sensor_) {
		ul = ADE_read(MR_VRMS, MR_VRMS_CNT);
		r = ul;
		r/=6011.26809785f;
		//r/=26000.0f;
		voltage_sensor_->publish_state(r);
	}
	if (power_sensor_) {
		unsigned long t = millis();
		ul = 0;
		ul = ADE_read(MR_AENERGY, MR_AENERGY_CNT);
		r = (ul - last_power);
		r/=(t - last_time); /* Correct by time */
		// r*=7375.0f; /* Calibration factor */
		r*=6825.0f;
		last_power = ul;
		last_time = t;
		//r/=26000.0f;
		power_sensor_->publish_state(r);
	}
	// Datasheet max conversion time for 1 shot is 155ms for 60Hz / 185ms for 50Hz
	//auto f = std::bind(&ADE7763Sensor::read_ade, this);
	//this->set_timeout("ADE7763Sensor::read_ade", 1000, f);
}

void ADE7763Sensor::read_ade() {
#if 0
	if (this->has_fault_()) {
		// Faults have been logged, clear it for next loop
		this->clear_fault_();
	} else {
		int32_t temp24 = this->read_register24_(ADE7763_LTCBH_REG);
		if (temp24 & 0x800000) {
			temp24 |= 0xFF000000;  // fix sign
		}

		temp24 >>= 5;  // bottom 5 bits are unused

		float temp_c = temp24;
		temp_c *= 0.0078125;

		ESP_LOGD(TAG, "Got thermocouple temperature: %.2f°C", temp_c);
		this->publish_state(temp_c);
	}
#endif
}

uint32_t ADE7763Sensor::ADE_read(unsigned char addr,unsigned char count)
{
	unsigned char i;
	uint32_t ret=0;

	/* Select the chip */
	this->enable();
	/* Write the address to access */
	this->write_byte(addr);
	/* Must wait 4 us for data to become valid */
	delayMicroseconds(4);
	switch (count) {
		case 1: {ret = this->read_byte();}
		case 2: {ret = (((uint32_t)this->read_byte())<<8); ret |= ((uint32_t)this->read_byte()); }
		case 3: {ret = (((uint32_t)this->read_byte())<<16);ret |= (((uint32_t)this->read_byte())<<8); ret |= ((uint32_t)this->read_byte()); }
		default: break;
	}
	/* Deselect the chip */
	this->disable();
	delayMicroseconds(10);
	return ret;
}

void ADE7763Sensor::ADE_write(unsigned char addr,uint32_t data,unsigned char count)
{
	unsigned char i;

	/* Select the chip */
	this->enable();
	
	/* Point to the Arduino MSB */
	this->write_byte(addr | ADE_WRITE_FLAG);
	switch (count) {
		case 1: {this->write_byte(data&0xff); } break;
		case 2: {this->write_byte((data>>8)&0xff); this->write_byte(data&0xff); } break;
		case 3: {this->write_byte((data>>16)&0xff);this->write_byte((data>>8)&0xff); this->write_byte(data&0xff); } break;
		case 4: {this->write_byte((data>>24)&0xff);this->write_byte((data>>16)&0xff);this->write_byte((data>>8)&0xff); this->write_byte(data&0xff); } break;
		default: break;
	}
	this->disable();
	delayMicroseconds(10);
}



float ADE7763Sensor::get_setup_priority() const { return setup_priority::DATA; }

}  // namespace ade7763
}  // namespace esphome
