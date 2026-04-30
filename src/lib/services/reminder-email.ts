import { FineReminderEvent, TicketDetailsInterface } from '@/lib/schema';

export class ReminderEmailService {
  
  /**
   * Process a fine reminder event and trigger appropriate email
   */
  async processReminderEvent(event: FineReminderEvent): Promise<void> {
    try {
      console.log(`📧 Processing ${event.event_type} event for ${event.user_email}`);

      // Transform Kafka event to TicketDetailsInterface format
      const ticketDetails: TicketDetailsInterface = {
        council: event.council,
        email: event.user_email,
        pcn_number: event.pcn_number,
        plate_number: event.plate_number,
        amount: event.amount,
        service_date_notice: event.service_date_notice,
        council_name: event.council_name || event.council,
        issued_by: event.issued_by,
        convtravention_time_from: event.convtravention_time_from,
        convtravention_time_to: event.convtravention_time_to,
      };

      // Determine email type based on event type
      const emailType = this.getEmailType(event.event_type);
      
      // Send appropriate email via existing Heracles service
      await this.sendEmail(ticketDetails, emailType, event);

      console.log(`✅ Successfully sent ${emailType} email for ${event.event_type}`);

    } catch (error) {
      console.error(`❌ Failed to process reminder event:`, error);
      throw error;
    }
  }

  /**
   * Determine email type based on Kafka event type
   */
  private getEmailType(): 'reminder' | 'success' {
    // All the fine reminder events should trigger reminder emails
    // Payment success events would trigger success emails (but those aren't in our topics list)
    return 'reminder';
  }

  /**
   * Send email via existing Heracles service
   */
  private async sendEmail(
    ticketDetails: TicketDetailsInterface, 
    emailType: 'reminder' | 'success',
    originalEvent: FineReminderEvent
  ): Promise<void> {
    try {
      // Get Heracles service URL from environment variables
      const heraclesUrl = process.env.NEXT_HERACLES_ENDPOINT;
      
      if (!heraclesUrl) {
        throw new Error('NEXT_HERACLES_ENDPOINT environment variable not set');
      }

      // Prepare payload for Heracles service
      const heraclesPayload = {
        ...ticketDetails,
        // Add additional context from the Kafka event
        event_type: originalEvent.event_type,
        discount_amount: originalEvent.discount_amount,
        discount_expires_at: originalEvent.discount_expires_at,
        enforcement_date: originalEvent.enforcement_date,
        timestamp: originalEvent.timestamp,
        project_uuid: originalEvent.project_uuid || "HIVEDECK"
      };

      // Determine endpoint based on email type
      const endpoint = emailType === 'reminder' 
        ? '/ticket/payment/reminder' 
        : '/ticket/payment/success';

      console.log(`🚀 Sending ${emailType} email to Heracles: ${heraclesUrl}${endpoint}`);

      const response = await fetch(`${heraclesUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heraclesPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Heracles API error (${response.status}): ${result.message || 'Unknown error'}`);
      }

      console.log(`✅ Heracles response:`, result.message || 'Email queued successfully');

    } catch (error) {
      console.error(`❌ Failed to send email via Heracles:`, error);
      throw error;
    }
  }

  /**
   * Validate email recipient
   */
  private validateRecipient(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get email template context based on event type
   */
  private getEmailContext(event: FineReminderEvent): Record<string, any> {
    const baseContext = {
      council: event.council,
      council_name: event.council_name || event.council,
      pcn_number: event.pcn_number,
      plate_number: event.plate_number,
      amount: event.amount,
      service_date_notice: event.service_date_notice,
      issued_by: event.issued_by,
      convtravention_time_from: event.convtravention_time_from,
      convtravention_time_to: event.convtravention_time_to,
    };

    // Add event-specific context
    switch (event.event_type) {
      case 'fine.discount.week_left':
        return {
          ...baseContext,
          urgency: 'low',
          discount_available: true,
          discount_amount: event.discount_amount,
          discount_expires_at: event.discount_expires_at,
          time_remaining: '1 week'
        };

      case 'fine.discount.3days':
        return {
          ...baseContext,
          urgency: 'medium',
          discount_available: true,
          discount_amount: event.discount_amount,
          discount_expires_at: event.discount_expires_at,
          time_remaining: '3 days'
        };

      case 'fine.discount.tomorrow':
        return {
          ...baseContext,
          urgency: 'high',
          discount_available: true,
          discount_amount: event.discount_amount,
          discount_expires_at: event.discount_expires_at,
          time_remaining: '1 day'
        };

      case 'fine.discount.final_hours':
        return {
          ...baseContext,
          urgency: 'critical',
          discount_available: true,
          discount_amount: event.discount_amount,
          discount_expires_at: event.discount_expires_at,
          time_remaining: 'hours'
        };

      case 'fine.full.discount_expired':
        return {
          ...baseContext,
          urgency: 'high',
          discount_available: false,
          full_payment_required: true
        };

      case 'fine.full.5days_left':
        return {
          ...baseContext,
          urgency: 'high',
          discount_available: false,
          time_remaining: '5 days',
          full_payment_required: true
        };

      case 'fine.full.final_day':
        return {
          ...baseContext,
          urgency: 'critical',
          discount_available: false,
          time_remaining: '1 day',
          full_payment_required: true
        };

      case 'fine.enforcement.started':
        return {
          ...baseContext,
          urgency: 'critical',
          enforcement_active: true,
          enforcement_date: event.enforcement_date
        };

      case 'fine.enforcement.overdue':
        return {
          ...baseContext,
          urgency: 'critical',
          enforcement_active: true,
          overdue: true,
          enforcement_date: event.enforcement_date
        };

      default:
        return baseContext;
    }
  }
}