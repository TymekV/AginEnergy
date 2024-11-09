import { ServerContext } from '@lib/providers/ServerProvider';
import { useContext } from 'react';

export function useServer() {
    return useContext(ServerContext);
}