import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import BadgeIcon from '@mui/icons-material/Badge';

// Styled components using TooltipContent styles
const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 752,
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',
  // Using primary colors from tooltip
  backgroundColor: theme.palette.mode === 'dark' ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)',
  color: theme.palette.mode === 'dark' ? 'hsl(0 0% 98%)' : 'hsl(240 10% 3.9%)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)' 
    : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  // Animation from tooltip
  animation: 'fadeIn 0.2s ease-out',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)'
    }
  }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '6px',
  margin: '6px 0',
  transition: 'all 0.15s ease-in-out',
  backgroundColor: theme.palette.mode === 'dark' ? 'hsl(240 5% 7%)' : 'hsl(0 0% 97%)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'hsl(240 4% 11%)' : 'hsl(0 0% 94%)',
    transform: 'translateX(4px)',
  },
  // Add slide-in animation similar to tooltip
  '&:nth-of-type(1)': { animationDelay: '0ms' },
  '&:nth-of-type(2)': { animationDelay: '50ms' },
  '&:nth-of-type(3)': { animationDelay: '100ms' },
  '&:nth-of-type(4)': { animationDelay: '150ms' },
  '&:nth-of-type(5)': { animationDelay: '200ms' },
  animation: 'slideIn 0.3s ease-out forwards',
  '@keyframes slideIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-10px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)'
    }
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)',
  color: 'white',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.mode === 'dark' ? 'hsl(224.3 76.3% 48%)' : 'hsl(217.2 91.2% 59.8%)',
  },
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 2px 8px rgba(0, 0, 0, 0.25)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.mode === 'dark' ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'hsla(240, 5%, 15%, 0.8)' : 'hsla(0, 0%, 90%, 0.8)',
  },
  transition: 'all 0.2s ease',
}));

// Add a styled header
const StyledHeader = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.palette.mode === 'dark' ? 'hsl(240 6% 10%)' : 'hsl(0 0% 99%)',
  borderBottom: theme.palette.mode === 'dark' ? '1px solid hsl(240 5% 15%)' : '1px solid hsl(0 0% 92%)',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}));

export default function UserDashboard() {
    const theme = useTheme();
    
    // replace this with your actual data or a stateful variable
    const userDetails = [
        { fieldName: "Name", value: "example name", icon: <PersonIcon /> },
        { fieldName: "Username", value: "example username", icon: <BadgeIcon /> },
        { fieldName: "Email", value: "example email", icon: <EmailIcon /> },
        { fieldName: "Created At", value: "example date-time", icon: <AccessTimeIcon /> },
        { fieldName: "Updated At", value: "example date-time", icon: <UpdateIcon /> }
    ];

  return (
    <StyledBox>
        <StyledHeader>
          <h2 style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            fontWeight: 600,
            color: theme.palette.mode === 'dark' ? 'hsl(0 0% 98%)' : 'hsl(240 6% 10%)'
          }}>
            Account Details
          </h2>
        </StyledHeader>
        <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <List dense={true}>
              {
                userDetails.map((userField, index) => {
                    return (
                    <StyledListItem
                        key={index}
                        secondaryAction={
                            <StyledIconButton 
                                edge="end" 
                                aria-label="edit"
                                onClick={()=>{
                                    // implement logic here on what actions 
                                    // to take or state to change when the edit button is clicked
                                }}
                                size="small"
                            >
                                <EditIcon fontSize="small" />
                            </StyledIconButton>
                        }
                    >
                    <ListItemAvatar>
                        <StyledAvatar>
                            {userField.icon}
                        </StyledAvatar>
                    </ListItemAvatar>
                        <ListItemText
                            primary={<span style={{ 
                                fontWeight: 600, 
                                color: theme.palette.mode === 'dark' ? 'hsl(0 0% 98%)' : 'hsl(240 6% 10%)',
                                fontSize: '0.95rem'
                            }}>{userField.fieldName}</span>}
                            secondary={<span style={{ 
                                color: theme.palette.mode === 'dark' ? 'hsl(240 5% 65%)' : 'hsl(240 4% 46%)',
                                fontSize: '0.85rem'
                            }}>{userField.value}</span>}
                        />
                    </StyledListItem>
                    )
                })
              }
            </List>
        </Grid>
    </StyledBox>
  );
}