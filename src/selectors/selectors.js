// returns all mobility data integrated with geoJSON data
export const getGlobalMapMobilityByDate = state => state.reducer.globalMapMobilityByDate;

// returns covid data
export const getCovidChartData = state => state.reducer.covidChartData;

// returns mobility data
export const getMobilityChartData = state => state.reducer.mobilityChartData;

// returns currently selected countryCode
export const getSelectedCountryCode = state => state.reducer.selectedCountryCode;

// returns array of dates only
export const getMobilityDates = state => state.reducer.mobilityDates;

// returns covid data including subregions
export const getCovidSubregions = state => state.reducer.covidSubregions;
