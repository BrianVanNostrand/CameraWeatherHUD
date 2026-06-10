import type { WidgetType } from "./widgetTypes";

function WebcamWidget() {
  return <div>📷 Webcam Widget</div>;
}

function MapWidget() {
  return <div>🗺️ Map Widget</div>;
}

function ClockWidget() {
  return <div>🕒 Clock Widget</div>;
}

export const widgetRegistry: Record<
  WidgetType,
  React.ComponentType
> = {
  webcam: WebcamWidget,
  map: MapWidget,
  clock: ClockWidget,
};