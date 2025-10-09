import { create } from "zustand";

export const useEventStore = create((set) => ({
  eventData: {
    name: "",
    location: "",
    address:"",
    city: "",
    eventType: "single",
    mainEventType:"",
    mainEventCategory:"",
    activeLocation: "",
    activeRecordSource: "youtube",
    locationInstruction:"",
    startDate: "",
    startTime: "",
    endTime: "",
    youtubeVideoLink: "",
    vimeoVideoLink: "",
    description: "",
    banner: null,
    mediaGallery: [],
    tickets: [],
  },


  setEventField: (field, value) =>
    set((state) => ({
      eventData: { ...state.eventData, [field]: value },
    })),


  addMedia: (file) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        mediaGallery: [...state.eventData.mediaGallery, file],
      },
    })),


  addTicket: (ticket) =>
   set((state) => {
      const defaultTicket = {
        type: "",
        name: "",
        numberOfTickets: "",
        price: "",
        description: "",
        salesStart: "",
        salesEnd: "",
        available: true,
        ticketsPerTransaction: { min: "", max: "" },
        groupName: "",
      };


      const newTicket = { ...defaultTicket, ...ticket };

      return {
        eventData: {
          ...state.eventData,
          tickets: [...state.eventData.tickets, newTicket],
        },
      };
    }),


  resetEvent: () =>
    set({
      eventData: {
        name: "",
        location: "",
        city: "",
        eventType: "single",
        activeLocation: "",
        activeRecordSource: "youtube",
        startDate: "",
        startTime: "",
        endTime: "",
        youtubeVideoLink: "",
        vimeoVideoLink: "",
        description: "",
        banner: null,
        mediaGallery: [],
        tickets: [],
      },
    }),
}));
