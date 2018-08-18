import { IdleModule } from './idle.module';

describe('IdleModule', () => {
  let idleModule: IdleModule;

  beforeEach(() => {
    idleModule = new IdleModule();
  });

  it('should create an instance', () => {
    expect(idleModule).toBeTruthy();
  });
});
