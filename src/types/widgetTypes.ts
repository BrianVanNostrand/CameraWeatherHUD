export type WidgetType = "webcam" | "map" | "clock";

export type WidgetInstance = {
  id: string;
  type: WidgetType;
};

export type ThemeType = {
  isDark: boolean;
};