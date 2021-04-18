import { Publisher, Subjects, TicketUpdatedEvent } from '@k-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated; 
}