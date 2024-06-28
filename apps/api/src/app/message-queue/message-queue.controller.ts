import {Controller, OnModuleInit} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {EventService} from "../event/event.service";
import {ModuleRef} from "@nestjs/core";
import {MessageQueueService} from "./message-queue.service";

@Controller('message_queue')
@ApiTags('Message Queue')
export class MessageQueueController implements OnModuleInit {

  private eventService: EventService;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly messageQueueService: MessageQueueService
  ) {}

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }

}
