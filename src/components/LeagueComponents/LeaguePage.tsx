/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Loader2,
  Clock,
  Info,
  DollarSign,
  Filter,
  X
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { selectUserId } from '../../main';
import { AnimatePresence, motion } from 'framer-motion';

interface League {
  leagueId: string;
  title: string;
  city: string;
  sport: string;
  isMixed: boolean;
  leagueType: string; // Singles, Doubles, etc.
  description: string;
  registrationFee: number;
  startDate: string;
  endDate: string;
  startRegDate: string;
  endRegDate: string;
}

const getSportIcon = (sport: string) => {
  if (sport === 'Tennis') return '🎾';
  if (sport === 'Pickleball') return '🥒';
  return '🏆';
};

const getSportColor = (sport: string) => {
  if (sport === 'Tennis') return 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200';
  if (sport === 'Pickleball') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
};

function TournamentCard({ league }: { league: League }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(dateString);
    endDate.setHours(0, 0, 0, 0);
    
    const timeDiff = endDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return dayDiff;
  };

  const daysRemaining = getDaysRemaining(league.endRegDate);

  const handleRegister = () => {
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      // Add registration logic here
    }, 1500);
  };

  // Enhanced sport badge colors with better contrast
  const getEnhancedSportBadgeColor = (sport: string) => {
    if (sport === 'Tennis') return 'bg-lime-600 text-white dark:bg-lime-500 dark:text-white';
    if (sport === 'Pickleball') return 'bg-green-600 text-white dark:bg-green-500 dark:text-white';
    return 'bg-purple-600 text-white dark:bg-purple-500 dark:text-white';
  };
  
  // Get accent color based on sport
  const getAccentColor = (sport: string) => {
    if (sport === 'Tennis') return '#84cc16';  // lime-500
    if (sport === 'Pickleball') return '#22c55e';  // green-500
    return '#a855f7';  // purple-500
  };
  
  // Get sport emoji - FIXED: use pickle emoji for Pickleball
  const getSportEmoji = (sport: string) => {
    if (sport === 'Tennis') return '🎾';
    if (sport === 'Pickleball') return '🥒';
    return '🏆';
  };
  
  // Get lighter accent color for background circle
  const getLighterAccentColor = (sport: string) => {
    if (sport === 'Tennis') return 'bg-lime-200 dark:bg-lime-900';
    if (sport === 'Pickleball') return 'bg-green-200 dark:bg-green-900';
    return 'bg-purple-200 dark:bg-purple-900';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ 
        duration: 0.3,
        y: { type: "spring", stiffness: 400, damping: 20 }
      }}
      className="relative group w-full mx-auto"
    >
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md group-hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 relative z-10 w-full">
        {/* Left accent bar - sport colored */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2"
          style={{ backgroundColor: getAccentColor(league.sport) }}
        />
        
        {/* Header section */}
        <div className="px-8 py-4 pb-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge className={getEnhancedSportBadgeColor(league.sport)}>
                  {getSportIcon(league.sport)} {league.sport}
                </Badge>
                <Badge variant="outline" className="border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-white">
                  {league.isMixed ? "Mixed" : "Single Gender"}
                </Badge>
                <Badge variant="outline" className="border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-white">
                  {league.leagueType || 'Doubles'}
                </Badge>
                {/* Moved "days left" badge here with the other badges */}
                <Badge className="bg-red-400 text-white dark:bg-red-500 dark:text-white">
                  {daysRemaining} days left to register
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{league.title}</CardTitle>
              <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{league.city}</span>
              </div>
            </div>
            <div 
              className={`h-16 w-16 flex items-center justify-center rounded-full p-2 overflow-hidden ${getLighterAccentColor(league.sport)}`}
            >
              <span className="text-3xl">{getSportEmoji(league.sport)}</span>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <CardContent className="px-8 pb-1">
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="h-4 w-4 mr-1" /> Tournament Dates
              </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {formatDate(league.startDate)} - {formatDate(league.endDate)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Registration Ends
              </span>
              <div className="flex items-center">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {formatDate(league.endRegDate)}
                </span>
              </div>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="details" className="border-b-0">
              <AccordionTrigger className="py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                <span className="flex items-center">
                  <Info className="h-4 w-4 mr-1" /> More Details
                </span>
              </AccordionTrigger>
              <AccordionContent className="rounded-md">
                <div className="pt-1 pb-2 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  {league.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {league.description}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-500 dark:text-gray-400">League ID</span>
                      <span className="font-medium">{league.leagueId}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 dark:text-gray-400">Registration Opens</span>
                      <span className="font-medium">{formatDate(league.startRegDate)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 dark:text-gray-400">Registration Fee</span>
                      <span className="font-medium">$20</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        
        <CardFooter className="px-8 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              <DollarSign className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
              <span className="font-medium">20</span>
            </div>
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="w-full md:w-auto"
            >
              {/* Button with glow effect */}
              <Button 
                onClick={handleRegister}
                disabled={isRegistering}
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-all group-hover:ring-2 group-hover:ring-blue-300 dark:group-hover:ring-blue-700 w-full md:w-auto"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Register Now'
                )}
              </Button>
            </motion.div>
          </div>
        </CardFooter>
        
        {/* Sport-themed gradient overlay on hover - visible but subtle */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ 
            background: `linear-gradient(135deg, ${getAccentColor(league.sport)}20 0%, transparent 70%)` 
          }}
        />
      </Card>
    </motion.div>
  );
}

// Updated Filter Component with more compact layout
function FilterBar({ filters, activeFilters, onFilterChange }: { 
  filters: { 
    sports: string[],
    leagueTypes: string[] 
  }, 
  activeFilters: string[], 
  onFilterChange: (filters: string[]) => void 
}) {
  const allFilters = {
    sports: ['Tennis', 'Pickleball', 'Other'],
    leagueTypes: ['Singles', 'Doubles'],
  };

  // Check if Mixed filter is active
  const isMixedActive = activeFilters.includes('Mixed');

  // Toggle a specific filter
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterChange(activeFilters.filter((f) => f !== filter));
    } else {
      onFilterChange([...activeFilters, filter]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 mt-4 overflow-hidden py-3 px-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-sm"
    >
      {/* More compact header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-700 dark:text-white" />
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Filters</h2>
        </div>
        
        {activeFilters.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onFilterChange([])}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
          >
            Clear All <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Compact filter rows */}
      <div className="flex flex-wrap items-center gap-y-3">
        {/* Sports section */}
        <div className="flex items-center mr-6">
          <span className="text-sm font-medium text-gray-700 dark:text-white mr-2">Sport:</span>
          <div className="flex flex-wrap gap-2">
            {allFilters.sports.map(value => {
              const isActive = activeFilters.includes(value);
              
              // Pick color based on sport
              let colorClass = '';
              if (value === 'Tennis') colorClass = 'bg-lime-100 hover:bg-lime-200 text-lime-800 dark:bg-lime-900 dark:hover:bg-lime-800 dark:text-white';
              else if (value === 'Pickleball') colorClass = 'bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-white';
              else colorClass = 'bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800 dark:text-white';
              
              if (isActive) {
                colorClass = colorClass.replace('bg-', 'bg-opacity-90 bg-');
                colorClass += ' ring-2 ring-offset-1 dark:ring-offset-gray-800';
                
                if (value === 'Tennis') colorClass += ' ring-lime-500';
                else if (value === 'Pickleball') colorClass += ' ring-green-500';
                else colorClass += ' ring-purple-500';
              }
              
              return (
                <motion.div
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 ${colorClass}`}
                    onClick={() => toggleFilter(value)}
                  >
                    {value}
                    {isActive && <X className="ml-2 h-3 w-3" />}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Type section */}
        <div className="flex items-center mr-6">
          <span className="text-sm font-medium text-gray-700 dark:text-white mr-2">Type:</span>
          <div className="flex flex-wrap gap-2">
            {allFilters.leagueTypes.map(value => {
              const isActive = activeFilters.includes(value);
              
              // Color for league types
              let colorClass = 'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white';
              
              if (isActive) {
                colorClass = colorClass.replace('bg-', 'bg-opacity-90 bg-');
                colorClass += ' ring-2 ring-offset-1 dark:ring-offset-gray-800 ring-blue-500';
              }
              
              return (
                <motion.div
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 ${colorClass}`}
                    onClick={() => toggleFilter(value)}
                  >
                    {value}
                    {isActive && <X className="ml-2 h-3 w-3" />}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Mixed filter as a separate toggle */}
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-white mr-2">Mixed:</span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge 
              className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 
                ${isMixedActive 
                  ? 'bg-opacity-90 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-white ring-2 ring-offset-1 dark:ring-offset-gray-800 ring-purple-500' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                }`}
              onClick={() => toggleFilter('Mixed')}
            >
              Mixed
              {isMixedActive && <X className="ml-2 h-3 w-3" />}
            </Badge>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TournamentGrid() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  // Sample filter data
  const filterOptions = {
    sports: ['Tennis', 'Pickleball', 'Other'],
    leagueTypes: ['Singles', 'Doubles']
  };

  const getLeagues = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    const city = "Austin";
    const leagueType = null;

    fetch('/get-leagues', {
      method: 'POST',
      body: JSON.stringify({
        city: city,
        leagueType: leagueType
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response: any) => {
      return response.json();
    })
    .then((leagueData) => {
      console.log(leagueData);
      
      // Enhance the data with additional fields if needed
      const enhancedData = leagueData.map((league: League) => ({
        ...league,
        leagueType: league.leagueType || 'Doubles',
        description: league.description || 'Join this exciting tournament for players of all levels. Enjoy a competitive and friendly atmosphere with great prizes!',
        registrationFee: league.registrationFee || 20
      }));
      
      setLeagues(enhancedData);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching leagues:', error);
      setLoading(false);
    });
  }

  useEffect(() => {
    getLeagues();
  }, []);

  useEffect(() => {
    console.log('userId from redux: ', userId);
  }, [userId]);

  // Apply filtering and sorting in one step using useMemo for performance
  const filteredAndSortedLeagues = useMemo(() => {
    // First, filter the leagues
    const filtered = activeFilters.length > 0
      ? leagues.filter((league) => {
          // Group active filters by category
          const activeSports = activeFilters.filter(f => 
            ['Tennis', 'Pickleball', 'Other'].includes(f)
          );
          
          const activeLeagueTypes = activeFilters.filter(f => 
            ['Singles', 'Doubles'].includes(f)
          );
          
          // Check for Mixed filter separately
          const isMixedFilterActive = activeFilters.includes('Mixed');
          
          // For sport filters
          const meetsSportRequirement = activeSports.length === 0 || 
            activeSports.includes(league.sport);
          
          // For league type filters
          const meetsLeagueTypeRequirement = activeLeagueTypes.length === 0 || 
            activeLeagueTypes.some(type => 
              league.leagueType.toLowerCase().includes(type.toLowerCase())
            );
          
          // For mixed filter - only apply if the filter is active
          const meetsMixedRequirement = !isMixedFilterActive || league.isMixed;
          
          // League must meet ALL selected filter categories
          return meetsSportRequirement && meetsLeagueTypeRequirement && meetsMixedRequirement;
        })
      : leagues;
    
    // Then, sort the filtered leagues by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return [...filtered].sort((a, b) => {
      const startDateA = new Date(a.startDate);
      const startDateB = new Date(b.startDate);
      
      // Check if dates are in future or past
      const aInFuture = startDateA >= today;
      const bInFuture = startDateB >= today;
      
      // Future dates come before past dates
      if (aInFuture && !bInFuture) return -1;
      if (!aInFuture && bInFuture) return 1;
      
      // If both dates are in the future, sort by earliest date first
      if (aInFuture && bInFuture) {
        return startDateA.getTime() - startDateB.getTime();
      }
      
      // If both dates are in the past, sort by closest to today first
      const diffA = Math.abs(today.getTime() - startDateA.getTime());
      const diffB = Math.abs(today.getTime() - startDateB.getTime());
      return diffA - diffB;
    });
  }, [leagues, activeFilters]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Tournament Selection</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Find and register for upcoming tournaments in your area</p>
      </div>

      {/* Filter bar */}
      {!loading && leagues.length > 0 && (
        <FilterBar 
          filters={filterOptions} 
          activeFilters={activeFilters} 
          onFilterChange={setActiveFilters} 
        />
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading tournaments...</p>
        </div>
      ) : filteredAndSortedLeagues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <AnimatePresence>
            {filteredAndSortedLeagues.map((league, index) => (
              <motion.div
                key={league.leagueId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="w-full"
              >
                <TournamentCard league={league} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
            <Filter className="h-16 w-16 text-gray-400 dark:text-gray-500" />
          </div>
          {activeFilters.length > 0 ? (
            <>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No Matching Tournaments</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                There are no tournaments that match your current filters. Try adjusting your filters to see more results.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setActiveFilters([])}
              >
                Clear Filters
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No Tournaments Available</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                There are currently no tournaments scheduled in your area. Please check back soon for upcoming events.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => getLeagues()}
              >
                Refresh
              </Button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}