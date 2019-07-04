import { TestBed } from '@angular/core/testing';

import { WebsocketEmulatorService } from './websocket-emulator.service';

describe('WebsocketEmulatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketEmulatorService = TestBed.get(WebsocketEmulatorService);
    expect(service).toBeTruthy();
  });
});
