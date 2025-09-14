import React from 'react';
import { useSelector } from 'react-redux';
import { selectHistoryEntries } from '@/store/emails/selectors';
import styles from './styles.module.scss';
import { formatCountdown } from '@/utils/formatCountdown';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/utils';

type TooltipWithBadgeProps = {
  badgeText: string;
  tooltipText: string;
  className?: string;
};

export const TooltipWithBadge = ({
  badgeText,
  tooltipText,
  className,
}: TooltipWithBadgeProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Badge className={className}>{badgeText}</Badge>
          </span>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={-2}
          className={cn('text-sm z-[9999] bg-gray-200', styles.timeoutBadge)}
        >
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const History: React.FC = () => {
  const historyEntries = useSelector(selectHistoryEntries);

  return (
    <>
      <h3 className={styles.title}>History of detected email addresses</h3>
      <div className={styles.historyList}>
        {historyEntries.length === 0 ? (
          <p className={styles.emptyHistory}>History is empty</p>
        ) : (
          historyEntries.map((entry, index) => (
            <div key={index} className={cn('bg-gray-50', styles.historyEntry)}>
              <div className={styles.historyEmails}>
                <span className={styles.historyEmail}>{entry.email}</span>
                {entry.dismissedTs && entry.isDismissed && (
                  <div>
                    <TooltipWithBadge
                      key={entry.timestamp}
                      badgeText="Dismissed"
                      tooltipText={`Expires: ${formatCountdown(entry.dismissedTs)}`}
                      className={styles.badge}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
