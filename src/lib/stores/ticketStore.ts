import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";
import { N8nResponse } from '@/lib/schema';
import { SavedFine } from '@/types';

interface TicketStore {
  ticketData: N8nResponse['output'] | null;
  setTicketData: (data: N8nResponse['output'] | null) => void;
  clearTicketData: () => void;
  savedTickets: SavedFine[];
  addSavedTicket: (fine: Omit<SavedFine, 'id' | 'dateSaved'>) => void;
  setSavedTickets: (tickets: SavedFine[]) => void;
  removeSavedTicket: (ticketId: string) => void;
  clearSavedTickets: () => void;
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      ticketData: null,
      setTicketData: (data) => set({ ticketData: data }),
      clearTicketData: () => set({ ticketData: null }),
      savedTickets: [],
      addSavedTicket: (fine) => set((state) => ({
        savedTickets: [
          {
            ...fine,
            id: Date.now().toString(), // Simple ID generation
            dateSaved: new Date().toLocaleDateString()
          },
          ...state.savedTickets
        ]
      })),
      setSavedTickets: (tickets) => set({ savedTickets: tickets }),
      removeSavedTicket: (ticketId) => set((state) => ({
        savedTickets: state.savedTickets.filter(ticket => ticket.id !== ticketId)
      })),
      clearSavedTickets: () => set({ savedTickets: [] }),
    }),
    {
      name: 'ticket-storage', // name of the item in storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // use sessionStorage instead of localStorage
    }
  )
);
