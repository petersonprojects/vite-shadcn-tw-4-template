import { SxProps, Theme } from "@mui/material";

export const mainBoxSx = (
  theme: Theme,
  isExpanded: boolean,
  calculatedPosition: number
): SxProps<Theme> => ({
  position: "absolute",
  right: calculatedPosition,
  bottom: 0,
  zIndex: 120,
  width: 250,
  height: isExpanded ? 400 : 40,
  bgcolor: theme.palette.background.paper,
  borderRadius: 1,
  boxShadow: 10,
  cursor: "pointer",
  overflow: "hidden",
  color: "black",
  marginRight: 3,
  flexDirection: "row",
  alignItems: isExpanded ? "flex-start" : "center",
  transition: isExpanded
    ? "width 0.2s ease-in-out, height 0.2s ease-in-out, color 0.2s ease-in-out, right 0.2s ease-in-out"
    : "width 0.2s ease-in-out, height 0.2s ease-in-out, background-color 0.2s ease-in-out, right 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: isExpanded ? undefined : theme.palette.primary.main,
    color: isExpanded ? "black" : "white",
  },
});

export const headerBoxSx = (hovered: boolean, theme: Theme): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  position: "sticky",
  borderBottom: "1px solid lightgray",
  backgroundColor: hovered ? theme.palette.primary.main : "transparent",
  color: hovered ? "white" : "black",
  transition: "width 0.2s, height 0.2s, background-color 0.2s, color 0.2s",
});

export const closeIconStyle = (hovered: boolean): SxProps<Theme> => ({
    color: hovered ? "white" : "black"
});

export const typographyNameStyle = (): SxProps<Theme> => ({
    marginRight: 2,
    marginLeft: 2
});

export const closeIconButtonStyle = (hoveredCollapsed: boolean): React.CSSProperties => ({
  marginLeft: "auto",
  color: hoveredCollapsed ? "white" : "black",
});