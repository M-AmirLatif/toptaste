export interface RestaurantStatus {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  hoursDetail: string;
}

export function getRestaurantStatus(): RestaurantStatus {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    
    const parts = formatter.formatToParts(new Date());
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const currentMinutes = hour * 60 + minute;

    // Opening: 1:00 PM = 13 * 60 = 780 minutes
    // Closing: 1:00 AM next day = 1 * 60 = 60 minutes
    const isOpen = currentMinutes >= 780 || currentMinutes < 60;

    if (isOpen) {
      return {
        isOpen: true,
        statusText: "Open Now • Closes 1:00 AM",
        badgeLabel: "Open Now",
        hoursDetail: "Serving Dine-in, Takeaway, Drive-thru & Free Delivery (Till 1 AM)",
      };
    } else {
      return {
        isOpen: false,
        statusText: "Reopens at 1:00 PM",
        badgeLabel: "Opens 1:00 PM",
        hoursDetail: "Accepting Advance Orders for 1 PM Delivery & Takeaway",
      };
    }
  } catch {
    return {
      isOpen: true,
      statusText: "Open Now • Closes 1:00 AM",
      badgeLabel: "Open Now",
      hoursDetail: "Dine-in, Drive-through, Takeout & Delivery",
    };
  }
}
