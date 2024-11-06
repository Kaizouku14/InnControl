import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from '@/server/root';

export const api = createTRPCReact<AppRouter>({});