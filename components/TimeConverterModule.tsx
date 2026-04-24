'use client';

import { useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';

function formatTimeInZone(date: Date, timeZone: string) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone,
    }).format(date);
  } catch {
    return 'Invalid time zone';
  }
}

function getOffsetLabel(timeZone: string) {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date());
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}

function parseLocalDateTime(value: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function TimeConverterModule() {
  const allTimeZones = useMemo(() => {
    const zones = Intl.supportedValuesOf('timeZone');
    return zones.includes('UTC') ? zones : ['UTC', ...zones];
  }, []);
  const timeZoneAliasMap: Record<string, string> = {
    utc: 'UTC',
    gmt: 'UTC',
    est: 'America/New_York',
    edt: 'America/New_York',
    cst: 'America/Chicago',
    cdt: 'America/Chicago',
    mst: 'America/Denver',
    mdt: 'America/Denver',
    pst: 'America/Los_Angeles',
    pdt: 'America/Los_Angeles',
    ist: 'Asia/Kolkata',
    gst: 'Asia/Dubai',
  };
  const timeZoneLookup = useMemo(
    () => new Map(allTimeZones.map((tz) => [tz.toLowerCase(), tz])),
    [allTimeZones]
  );
  const timeZoneOptions = useMemo(
    () =>
      allTimeZones.map((tz) => ({
        value: tz,
        label: `${tz} (${getOffsetLabel(tz) || 'UTC'})`,
      })),
    [allTimeZones]
  );

  const resolveTimeZoneInput = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';

    const lower = trimmed.toLowerCase();
    if (timeZoneAliasMap[lower]) {
      return timeZoneAliasMap[lower];
    }

    if (trimmed.includes(' (')) {
      const beforeBracket = trimmed.split(' (')[0].trim();
      const fromLabel = timeZoneLookup.get(beforeBracket.toLowerCase());
      if (fromLabel) return fromLabel;
    }

    return timeZoneLookup.get(lower) || trimmed;
  };
  const [sourceTimeZone, setSourceTimeZone] = useState('Asia/Karachi');
  const [targetTimeZone, setTargetTimeZone] = useState('Europe/London');
  const [localInput, setLocalInput] = useState(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  });

  const parsedDate = parseLocalDateTime(localInput);
  const isSourceValid = allTimeZones.includes(sourceTimeZone);
  const isTargetValid = allTimeZones.includes(targetTimeZone);
  const sourcePreview = parsedDate && isSourceValid ? formatTimeInZone(parsedDate, sourceTimeZone) : '--';
  const targetPreview = parsedDate && isTargetValid ? formatTimeInZone(parsedDate, targetTimeZone) : '--';

  return (
    <section className="bg-white rounded-xl shadow-sm border border-primary-light p-4 md:p-6 mb-6">
      <div className="flex items-center mb-4">
        <FiClock className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Time Converter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-primary mb-2">DATE & TIME</label>
          <input
            type="datetime-local"
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            className="w-full px-3 py-2 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-2">YOUR TIME ZONE</label>
          <input
            list="source-time-zones"
            value={sourceTimeZone}
            onChange={(e) => setSourceTimeZone(resolveTimeZoneInput(e.target.value))}
            className="w-full px-3 py-2 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {!isSourceValid && (
            <p className="text-xs text-red-600 mt-1">Choose a valid time zone from suggestions.</p>
          )}
          <datalist id="source-time-zones">
            {timeZoneOptions.map((tz) => (
              <option key={tz.value} value={tz.value} label={tz.label}>
                {tz.label}
              </option>
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-2">CLIENT TIME ZONE</label>
          <input
            list="target-time-zones"
            value={targetTimeZone}
            onChange={(e) => setTargetTimeZone(resolveTimeZoneInput(e.target.value))}
            className="w-full px-3 py-2 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {!isTargetValid && (
            <p className="text-xs text-red-600 mt-1">Choose a valid time zone from suggestions.</p>
          )}
          <datalist id="target-time-zones">
            {timeZoneOptions.map((tz) => (
              <option key={tz.value} value={tz.value} label={tz.label}>
                {tz.label}
              </option>
            ))}
          </datalist>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-accent-light border border-primary-light rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Your Time ({sourceTimeZone}) {getOffsetLabel(sourceTimeZone)}</p>
          <p className="text-sm font-semibold text-gray-900">{sourcePreview}</p>
        </div>
        <div className="bg-accent-light border border-primary-light rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Client Time ({targetTimeZone}) {getOffsetLabel(targetTimeZone)}</p>
          <p className="text-sm font-semibold text-gray-900">{targetPreview}</p>
        </div>
      </div>
    </section>
  );
}

