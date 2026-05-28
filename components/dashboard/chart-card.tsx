'use client'

import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'
import {
  MoreHorizontal,
  Download,
  Share2,
  Maximize2,
  RefreshCw,
  Trash2,
  Copy,
  BarChart3,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty'

// Types
export type TimePeriod = 'last-week' | 'last-90-days' | 'last-30-days' | 'last-12-months'
export type ChartType = 'line' | 'bar' | 'area' | 'pie'
export type ChartState = 'idle' | 'loading' | 'error' | 'empty'

export interface ChartDataPoint {
  label: string
  value: number
  secondaryValue?: number
}

export interface ChartCardProps {
  /** Card title */
  title: string
  /** Optional description */
  description?: string
  /** Type of chart to render */
  chartType?: ChartType
  /** Current time period */
  timePeriod?: TimePeriod
  /** Chart data */
  data?: ChartDataPoint[]
  /** Secondary data series for comparison */
  secondaryData?: ChartDataPoint[]
  /** Current state of the card */
  state?: ChartState
  /** Show actions menu button */
  showActionsMenu?: boolean
  /** Show context menu on right-click */
  showContextMenu?: boolean
  /** Show display tag/badge */
  showTag?: boolean
  /** Tag content */
  tagContent?: string
  /** Tag variant */
  tagVariant?: 'default' | 'secondary' | 'outline'
  /** Show time period selector */
  showTimePeriodSelector?: boolean
  /** Custom chart height */
  chartHeight?: number
  /** Chart colors */
  colors?: string[]
  /** Error message when in error state */
  errorMessage?: string
  /** Callback when time period changes */
  onTimePeriodChange?: (period: TimePeriod) => void
  /** Callback for refresh action */
  onRefresh?: () => void
  /** Callback for download action */
  onDownload?: () => void
  /** Callback for share action */
  onShare?: () => void
  /** Callback for fullscreen action */
  onFullscreen?: () => void
  /** Callback for delete action */
  onDelete?: () => void
  /** Callback for duplicate action */
  onDuplicate?: () => void
  /** Additional className */
  className?: string
}

// Helper functions
function getTimePeriodLabel(period: TimePeriod): string {
  switch (period) {
    case 'last-week':
      return 'Last Week'
    case 'last-90-days':
      return 'Last Quarter'
    case 'last-30-days':
      return 'Last 30 Days'
    case 'last-12-months':
      return 'Last 12 Months'
    default:
      return period
  }
}

// Sub-components
function ChartCardSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="w-full rounded-lg" style={{ height }} />
      <div className="flex gap-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

function ChartCardEmpty() {
  return (
    <Empty className="border-0 py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BarChart3 />
        </EmptyMedia>
        <EmptyTitle>No data available</EmptyTitle>
        <EmptyDescription>
          There is no data to display for the selected time period. Try
          selecting a different range or check back later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function ChartCardError({ message }: { message?: string }) {
  return (
    <Empty className="border-0 py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RefreshCw className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Failed to load data</EmptyTitle>
        <EmptyDescription>
          {message || 'An error occurred while loading the chart data. Please try again.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

// Main component
export function ChartCard({
  title,
  description,
  chartType = 'line',
  timePeriod = 'last-30-days',
  data = [],
  state = 'idle',
  showActionsMenu = false,
  showContextMenu = false,
  showTag = false,
  tagContent = 'Live',
  tagVariant = 'default',
  showTimePeriodSelector = false,
  chartHeight = 300,
  colors = ['#8B1538', '#1E40AF'],
  errorMessage,
  onTimePeriodChange,
  onRefresh,
  onDownload,
  onShare,
  onFullscreen,
  onDelete,
  onDuplicate,
  className,
}: ChartCardProps) {
  // Prepare chart data
  const xAxisData = data.map((d) => d.label)
  const seriesData = data.map((d) => d.value)
  const secondarySeriesData = data.map((d) => d.secondaryValue ?? null)
  const hasSecondaryData = data.some((d) => d.secondaryValue !== undefined)

  // Prepare pie chart data
  const pieData = data.map((d, index) => ({
    id: index,
    value: d.value,
    label: d.label,
  }))

  // Shared axis config
  const yAxisConfig = [
    {
      disableLine: true,
      disableTicks: true,
    },
  ]

  const xAxisBaseConfig = {
    disableLine: false,
    disableTicks: false,
  }

  // Shared grid config: dashed horizontal lines only
  const gridConfig = { horizontal: true, vertical: false }

  // Render chart based on type
  const renderChart = () => {
    const commonProps = {
      height: chartHeight,
      margin: { top: 20, bottom: 30, left: 48, right: 20 },
      grid: gridConfig,
      sx: {
        '& .MuiChartsGrid-horizontalLine': {
          strokeDasharray: '4 4',
          stroke: '#D6D6D6',
        },
        '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-line': {
          stroke: '#D6D6D6',
        },
        '& .MuiChartsAxis-root.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
          stroke: '#D6D6D6',
        },
        '& .MuiChartsAxis-root.MuiChartsAxis-directionY .MuiChartsAxis-line': {
          display: 'none',
        },
        '& .MuiChartsAxis-tickLabel': {
          fill: '#6b7280',
          fontSize: '0.75rem',
        },
      },
      slotProps: {
        legend: {
          hidden: chartType !== 'pie',
        },
      },
    }

    switch (chartType) {
      case 'line':
        return (
          <LineChart
            {...commonProps}
            xAxis={[{ scaleType: 'point', data: xAxisData, ...xAxisBaseConfig }]}
            yAxis={yAxisConfig}
            series={[
              { data: seriesData, color: colors[0], area: false },
              ...(hasSecondaryData
                ? [{ data: secondarySeriesData, color: colors[1], area: false }]
                : []),
            ]}
          />
        )
      case 'bar':
        return (
          <BarChart
            {...commonProps}
            xAxis={[{ scaleType: 'band', data: xAxisData, ...xAxisBaseConfig }]}
            yAxis={yAxisConfig}
            series={[
              { data: seriesData, color: colors[0] },
              ...(hasSecondaryData
                ? [{ data: secondarySeriesData, color: colors[1] }]
                : []),
            ]}
          />
        )
      case 'area':
        return (
          <LineChart
            {...commonProps}
            xAxis={[{ scaleType: 'point', data: xAxisData, ...xAxisBaseConfig }]}
            yAxis={yAxisConfig}
            series={[
              { 
                data: seriesData, 
                color: colors[0], 
                area: true,
              },
              ...(hasSecondaryData
                ? [{ 
                    data: secondarySeriesData, 
                    color: colors[1], 
                    area: true,
                  }]
                : []),
            ]}
            slotProps={{
              ...commonProps.slotProps,
              popper: {
                sx: {
                  '& .MuiChartsTooltip-root': {
                    backgroundColor: '#ffffff',
                  },
                },
              },
            }}
            sx={{
              ...commonProps.sx,
              '& .MuiAreaElement-root': {
                opacity: 0.3,
              },
            }}
          />
        )
      case 'pie':
        return (
          <PieChart
            {...commonProps}
            series={[
              {
                data: pieData,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            colors={colors}
          />
        )
      default:
        return null
    }
  }

  // Render content based on state
  const renderContent = () => {
    switch (state) {
      case 'loading':
        return <ChartCardSkeleton height={chartHeight} />
      case 'empty':
        return <ChartCardEmpty />
      case 'error':
        return <ChartCardError message={errorMessage} />
      case 'idle':
      default:
        if (data.length === 0) {
          return <ChartCardEmpty />
        }
        return renderChart()
    }
  }

  // Actions menu content
  const actionsMenuItems = (
    <>
      {onRefresh && (
        <DropdownMenuItem onClick={onRefresh}>
          <RefreshCw />
          Refresh
        </DropdownMenuItem>
      )}
      {onDownload && (
        <DropdownMenuItem onClick={onDownload}>
          <Download />
          Download
        </DropdownMenuItem>
      )}
      {onShare && (
        <DropdownMenuItem onClick={onShare}>
          <Share2 />
          Share
        </DropdownMenuItem>
      )}
      {onFullscreen && (
        <DropdownMenuItem onClick={onFullscreen}>
          <Maximize2 />
          Fullscreen
        </DropdownMenuItem>
      )}
      {onDuplicate && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy />
            Duplicate
          </DropdownMenuItem>
        </>
      )}
      {onDelete && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} variant="destructive">
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </>
      )}
    </>
  )

  // Context menu content
  const contextMenuItems = (
    <>
      {onRefresh && (
        <ContextMenuItem onClick={onRefresh}>
          <RefreshCw className="mr-2 size-4" />
          Refresh
        </ContextMenuItem>
      )}
      {onDownload && (
        <ContextMenuItem onClick={onDownload}>
          <Download className="mr-2 size-4" />
          Download
        </ContextMenuItem>
      )}
      {onShare && (
        <ContextMenuItem onClick={onShare}>
          <Share2 className="mr-2 size-4" />
          Share
        </ContextMenuItem>
      )}
      {onFullscreen && (
        <ContextMenuItem onClick={onFullscreen}>
          <Maximize2 className="mr-2 size-4" />
          Fullscreen
        </ContextMenuItem>
      )}
      {onDuplicate && (
        <>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={onDuplicate}>
            <Copy className="mr-2 size-4" />
            Duplicate
          </ContextMenuItem>
        </>
      )}
      {onDelete && (
        <>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={onDelete} variant="destructive">
            <Trash2 className="mr-2 size-4" />
            Delete
          </ContextMenuItem>
        </>
      )}
    </>
  )

  const cardContent = (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{title}</CardTitle>
            {showTag && (
              <Badge variant={tagVariant} className="text-xs">
                {tagContent}
              </Badge>
            )}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            {showTimePeriodSelector && (
              <Select
                value={timePeriod}
                onValueChange={(value) =>
                  onTimePeriodChange?.(value as TimePeriod)
                }
              >
                <SelectTrigger size="sm" className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-90-days">Last Quarter</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-12-months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            )}
            {showActionsMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Open actions menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actionsMenuItems}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )

  // Wrap with context menu if enabled
  if (showContextMenu) {
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{cardContent}</ContextMenuTrigger>
        <ContextMenuContent>{contextMenuItems}</ContextMenuContent>
      </ContextMenu>
    )
  }

  return cardContent
}

// Export helper for generating sample data
export function generateSampleData(period: TimePeriod): ChartDataPoint[] {
  switch (period) {
    case 'last-week':
      return [
        { label: 'Mon', value: 120, secondaryValue: 100 },
        { label: 'Tue', value: 150, secondaryValue: 130 },
        { label: 'Wed', value: 180, secondaryValue: 160 },
        { label: 'Thu', value: 140, secondaryValue: 120 },
        { label: 'Fri', value: 200, secondaryValue: 180 },
        { label: 'Sat', value: 170, secondaryValue: 150 },
        { label: 'Sun', value: 130, secondaryValue: 110 },
      ]
    case 'last-90-days':
      return Array.from({ length: 90 }, (_, i) => ({
        label: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 250) + 75,
        secondaryValue: Math.floor(Math.random() * 220) + 60,
      }))
    case 'last-30-days':
      return Array.from({ length: 30 }, (_, i) => ({
        label: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 200) + 50,
        secondaryValue: Math.floor(Math.random() * 180) + 40,
      }))
    case 'last-12-months':
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      return months.map((month) => ({
        label: month,
        value: Math.floor(Math.random() * 5000) + 1000,
        secondaryValue: Math.floor(Math.random() * 4500) + 900,
      }))
    default:
      return []
  }
}
