/* eslint-disable @typescript-eslint/no-unused-vars */
import { SxProps, Theme } from "@mui/material";

export const chatRoomListBoxSx = (
  theme: Theme,
  isExpanded: boolean
): SxProps<Theme> => ({
  zIndex: 120,
  width: isExpanded ? 300 : 175,
  height: isExpanded ? 400 : 50,
  bgcolor: theme.palette.background.paper,
  borderRadius: 1,
  boxShadow: 10,
  cursor: isExpanded ? "default" : "pointer",
  display: isExpanded ? "block" : "flex",
  justifyContent: isExpanded ? "flex-start" : "center",
  alignItems: isExpanded ? "flex-start" : "center",
  transition: isExpanded
    ? "width 0.2s ease-in-out, height 0.2s ease-in-out"
    : "width 0.2s ease-in-out, height 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out",
  "@media (hover:hover)": {
    "&:hover": {
      backgroundColor: isExpanded ? theme.palette.background.paper : theme.palette.primary.main,
    },
  },
  overflow: "hidden",
});

export const expandedBoxSx = (theme: Theme): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  padding: 1,
  backgroundColor: "white",
  borderBottom: "1px solid #ccc",
  transition: "background-color 0.2s, color 0.2s",
  color: "black",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
});

export const listItemSx = (theme: Theme): SxProps<Theme> => ({
  cursor: "pointer",
  paddingRight: 0,
});

export const listItemButtonSx = (
  theme: Theme
): SxProps<Theme> => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
    cursor: "pointer",
  },
  transition: "background-color 0.2s",
  paddingRight: 0,
});

export const listItemTextSx = (): SxProps<Theme> => ({
  maxWidth: "248px",
});

export const iconButtonSx = (): SxProps<Theme> => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&:hover": { backgroundColor: "transparent" },
});

export const chatBubbleIconSx = (): SxProps<Theme> => ({
  transition: "color 0.2s",
});

export const chatBubbleTextSx = (): SxProps<Theme> => ({
  top: "-5px",
  transition: "color 0.2s",
  width: 100,
});