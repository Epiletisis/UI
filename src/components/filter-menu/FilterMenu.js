import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import {
  fetchBrands, fetchCategories, fetchDemographics, fetchColors, fetchMaterials
} from './FilterMenuService';

const drawerWidth = 240;

/**
 * @name FilterMenu
 * @description fetches all unique filtering options from API and dsplays them
 * on a collapsible side menu
 * @return component
 */
export default function FilterMenu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isActiveFilter, setActiveFilter] = React.useState(false);
  const [brands, setBrands] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [demographics, setDemographics] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);
  const [minTextInput, setMinTextInput] = React.useState('');
  const [maxTextInput, setMaxTextInput] = React.useState('');

  useEffect(() => {
    fetchBrands(setBrands);
  }, []);

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  useEffect(() => {
    fetchDemographics(setDemographics);
  }, []);

  useEffect(() => {
    fetchColors(setColors);
  }, []);

  useEffect(() => {
    fetchMaterials(setMaterials);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleActiveFilter = () => {
    setActiveFilter(!isActiveFilter);
  };

  const handleMinTextInputChange = (event) => {
    setMinTextInput(event.target.value);
    if (event.target.value.length !== 0 || maxTextInput.length !== 0) {
      setActiveFilter(true);
    } else {
      setActiveFilter(false);
    }
  };

  const handleMaxTextInputChange = (event) => {
    setMaxTextInput(event.target.value);
    if (event.target.value.length !== 0 || minTextInput.length !== 0) {
      setActiveFilter(true);
    } else {
      setActiveFilter(false);
    }
  };

  const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start'
  }));

  return (
    <>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          color: isActiveFilter ? '#99078c' : '#144012',
          ml: 0.5,
          mr: 0.5,
          mt: 0.25
        }}
      >

        <MenuIcon sx={{ fontSize: '30px' }} />
      </IconButton>

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: '#f8a1e5',
            width: drawerWidth,
            flexShrink: 0,
            height: '92.5vh',
            marginTop: '72px'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: '#144012' }} /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <div>
          <Accordion sx={{ backgroundColor: '#f8a1e5', margin: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Brand</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormGroup aria-label="position" column sx={{ fontSize: 10 }}>
                  {brands.map((brand) => (
                    <FormControlLabel
                      value="Altra"
                      control={<Checkbox color="success" onClick={handleActiveFilter} />}
                      label={<Typography variant="body2">{brand}</Typography>}
                      labelPlacement="end"
                    />
                  ))}
                  ;
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#f8a1e5', margin: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormGroup aria-label="position" column sx={{ fontSize: 10 }}>
                  {categories.map((category) => (
                    <FormControlLabel
                      value="Altra"
                      control={<Checkbox color="success" onClick={handleActiveFilter} />}
                      label={<Typography variant="body2">{category}</Typography>}
                      labelPlacement="end"
                    />
                  ))}
                  ;
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#f8a1e5' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Demographic</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormGroup aria-label="position" column sx={{ fontSize: 10 }}>
                  {demographics.map((demographic) => (
                    <FormControlLabel
                      value="Altra"
                      control={<Checkbox color="success" onClick={handleActiveFilter} />}
                      label={<Typography variant="body2">{demographic}</Typography>}
                      labelPlacement="end"
                    />
                  ))}
                  ;
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#f8a1e5' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <TextField
                    label="Minimum Price"
                    id="outlined-size-small"
                    size="small"
                    color="success"
                    value={minTextInput}
                    onChange={handleMinTextInputChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Maximum Price"
                    id="outlined-size-small"
                    size="small"
                    color="success"
                    value={maxTextInput}
                    onChange={handleMaxTextInputChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#f8a1e5' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormGroup aria-label="position" column sx={{ fontSize: 10 }}>
                  {colors.map((color) => (
                    <FormControlLabel
                      value="Altra"
                      control={<Checkbox color="success" onClick={handleActiveFilter} />}
                      label={(
                        <Button
                          variant="contained"
                          disabled="true"
                          sx={{
                            backgroundColor: color,
                            height: '10px',
                            '&:disabled': {
                              backgroundColor: color,
                              height: '20px',
                              minWidth: '0px',
                              width: '20px'
                            }
                          }}
                        />
                      )}
                      labelPlacement="end"
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#f8a1e5' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Material</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormGroup aria-label="position" column sx={{ fontSize: 10 }}>
                  {materials.map((material) => (
                    <FormControlLabel
                      value="Altra"
                      control={<Checkbox color="success" onClick={handleActiveFilter} />}
                      label={<Typography variant="body2">{material}</Typography>}
                      labelPlacement="end"
                    />
                  ))}
                  ;
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Button
            variant="contained"
            sx={{
              mt: 2, ml: 6, mb: 5, backgroundColor: '#99078c', '&:hover': { backgroundColor: 'purple' }
            }}
          >
            Apply Filters
          </Button>
        </div>
      </Drawer>
    </>
  );
}
