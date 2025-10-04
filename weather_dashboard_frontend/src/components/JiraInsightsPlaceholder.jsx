 // PUBLIC_INTERFACE
export default function JiraInsightsPlaceholder() {
  /**
   * Placeholder for Jira visualizations. Reads env vars in future integration:
   * VITE_JIRA_BASE_URL, VITE_JIRA_EMAIL, VITE_JIRA_API_TOKEN, VITE_JIRA_JQL
   */
  return (
    <div className="card" aria-live="polite">
      <div className="card-header">Jira Insights</div>
      <div className="card-body">
        <p className="muted">Connect Jira to visualize project metrics here (e.g., issues by status, sprint velocity).</p>
        <ul className="muted" style={{lineHeight:1.8}}>
          <li>Total open issues</li>
          <li>Issues by status (To Do / In Progress / Done)</li>
          <li>Average resolution time</li>
        </ul>
      </div>
    </div>
  );
}
