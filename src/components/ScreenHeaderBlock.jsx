import React from 'react';

export default function ScreenHeaderBlock({
  screenSubtitle,
  title,
  caption,
  isDeveloperMode
}) {
  return (
    <div className="screen-header-block">
      {/* Subtitle is ONLY displayed when isDeveloperMode is true */}
      {isDeveloperMode && screenSubtitle && (
        <div className="screen-subtitle-dev">
          {screenSubtitle}
        </div>
      )}

      <h1 className="screen-title">{title}</h1>

      {caption && (
        <p className="screen-caption" style={{ whiteSpace: 'pre-line' }}>
          {caption}
        </p>
      )}
    </div>
  );
}
