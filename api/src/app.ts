import { CreateServer } from '@http/server';
import { ENV } from '@shared/constants/env';
import { logger } from '@shared/utils/logger';

const app = CreateServer();

app.listen(ENV.PORT, () => {
    logger.info(`Server is running on port ${ENV.PORT}`);
});
