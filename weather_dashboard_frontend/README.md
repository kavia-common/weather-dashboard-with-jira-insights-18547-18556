# Weather Dashboard (React)

A modern weather dashboard with current conditions, 7-day forecast, and a placeholder for Jira insights. Styled with the Ocean Professional theme.

## Setup
1. Copy .env.example to .env and set your keys:
```
REACT_APP_OPENWEATHERMAP_API_KEY=YOUR_KEY
# Optional Jira settings for future integration
REACT_APP_JIRA_BASE_URL=
REACT_APP_JIRA_EMAIL=
REACT_APP_JIRA_API_TOKEN=
REACT_APP_JIRA_JQL=
```
2. Install dependencies and start the dev server:
```
npm install
npm start
```

## Usage
- Search for a city in the header. Results use OpenWeatherMap Geocoding and One Call 3.0 endpoints.
- Toggle units between °C and °F.
- Jira section is a placeholder for future visualizations.

## Notes
- If REACT_APP_OPENWEATHERMAP_API_KEY is missing, API calls will fail; the UI will show an error.
- This app uses built-in fetch and localStorage for lightweight caching of geocode results.
