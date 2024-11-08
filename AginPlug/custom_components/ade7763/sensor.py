import esphome.codegen as cg
import esphome.config_validation as cv
from esphome.components import sensor, spi
from esphome.const import CONF_ID, CONF_RESET_PIN, CONF_VOLTAGE, CONF_CURRENT, CONF_POWER, UNIT_VOLT, ICON_FLASH, UNIT_AMPERE, UNIT_WATT
from esphome import pins

# Define the namespace and main sensor class
ade7763_ns = cg.esphome_ns.namespace('ade7763')
ADE7763Sensor = ade7763_ns.class_('ADE7763Sensor', cg.PollingComponent, spi.SPIDevice)

# Define the configuration schema
CONFIG_SCHEMA = cv.Schema({
    cv.GenerateID(): cv.declare_id(ADE7763Sensor),
    cv.Optional(CONF_RESET_PIN): pins.gpio_output_pin_schema,
    cv.Optional(CONF_VOLTAGE): sensor.sensor_schema(
        unit_of_measurement=UNIT_VOLT,
        icon=ICON_FLASH,
        accuracy_decimals=1
    ),
    cv.Optional(CONF_CURRENT): sensor.sensor_schema(
        unit_of_measurement=UNIT_AMPERE,
        icon=ICON_FLASH,
        accuracy_decimals=1
    ),
    cv.Optional(CONF_POWER): sensor.sensor_schema(
        unit_of_measurement=UNIT_WATT,
        icon=ICON_FLASH,
        accuracy_decimals=1
    ),
}).extend(cv.polling_component_schema('60s')).extend(spi.spi_device_schema())

# Define the main `to_code` function
def to_code(config):
    var = cg.new_Pvariable(config[CONF_ID])
    yield cg.register_component(var, config)
    yield spi.register_spi_device(var, config)

    # Handle optional reset pin
    if CONF_RESET_PIN in config:
        reset_pin = yield cg.gpio_pin_expression(config[CONF_RESET_PIN])
        cg.add(var.set_reset_pin(reset_pin))

    # Handle optional voltage sensor
    if CONF_VOLTAGE in config:
        voltage_sensor = yield sensor.new_sensor(config[CONF_VOLTAGE])
        cg.add(var.set_voltage_sensor(voltage_sensor))

    # Handle optional current sensor
    if CONF_CURRENT in config:
        current_sensor = yield sensor.new_sensor(config[CONF_CURRENT])
        cg.add(var.set_current_sensor(current_sensor))

    # Handle optional power sensor
    if CONF_POWER in config:
        power_sensor = yield sensor.new_sensor(config[CONF_POWER])
        cg.add(var.set_power_sensor(power_sensor))

