// returns all mobility data integrated with geoJSON data
export const getGlobalMapMobilityByDate = state => state.reducer.globalMapMobilityByDate;

// returns covid data
export const getCovidChartData = state => state.reducer.covidChartData;

// returns mobility data
export const getMobilityChartData = state => state.reducer.mobilityChartData;

// returns mobility comparison data
export const getMobilityCompareChartData = state => state.reducer.mobilityCompareChartData;

// returns currently selected countryCode
export const getMobilityCompareCountryCode = state => state.reducer.mobilityCompareCountryCode;

// returns currently selected countryName
export const getMobilityCompareCountryName = state => state.reducer.mobilityCompareCountryName;

// returns currently selected countryCode
export const getSelectedCountryCode = state => state.reducer.selectedCountryCode;

//returns currently selected countryName
export const getSelectedCountryName = state => state.reducer.selectedCountryName;

// returns currently selected subregion
export const getSelectedSubregion = state => state.reducer.selectedSubregion;

// returns array of dates only
export const getMobilityDates = state => state.reducer.mobilityDates;

// returns mobility data for a single country including subregions
export const getMobilitySubregionNames = state => state.reducer.mobilitySubregionNames;

// returns currently selected subregion
export const getMobilityCompareSubregion = state => state.reducer.mobilityCompareSubregion;

// returns mobility data for a single country including subregions
export const getMobilityCompareSubregionNames = state => state.reducer.mobilityCompareSubregionNames;

// returns covid data for a single country including subregions
export const getCovidSubregions = state => state.reducer.covidSubregions;

// returns all covid data for a single subRegion
export const getCovidSubData = state => state.reducer.covidSubData;

// returns all mobility data for a single subRegion
export const getMobilitySubData = state => state.reducer.mobilitySubData;

//returns US map geojson with mobility data 
export const getUSMobilityMap = state => state.reducer.USMobilityMap;
