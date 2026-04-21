'use client'

import * as React from 'react'
import {
  ChartCard,
  generateSampleData,
  type TimePeriod,
  type ChartState,
  type ChartType,
} from '@/components/dashboard/chart-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>('last-30-days')
  const [chartData, setChartData] = React.useState(() =>
    generateSampleData('last-30-days')
  )

  // Handle time period change
  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period)
    setChartData(generateSampleData(period))
  }

  // Demo action handlers
  const handleRefresh = () => {
    setChartData(generateSampleData(timePeriod))
  }

  const handleDownload = () => {
    console.log('[v0] Download triggered')
  }

  const handleShare = () => {
    console.log('[v0] Share triggered')
  }

  const handleFullscreen = () => {
    console.log('[v0] Fullscreen triggered')
  }

  const handleDelete = () => {
    console.log('[v0] Delete triggered')
  }

  const handleDuplicate = () => {
    console.log('[v0] Duplicate triggered')
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Chart Card Component
          </h1>
          <p className="text-muted-foreground max-w-2xl text-pretty">
            A versatile dashboard chart card with MUI Charts. Features optional
            actions menu, context menu, display tags, and multiple time period
            variants.
          </p>
        </div>

        {/* Section: Chart Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium">Chart Types</h2>
            <Badge variant="secondary">4 variants</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard
              title="Line Chart"
              description="Revenue trends over time"
              chartType="line"
              timePeriod={timePeriod}
              data={chartData}
              showActionsMenu
              showTimePeriodSelector
              onTimePeriodChange={handleTimePeriodChange}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
              onShare={handleShare}
            />
            <ChartCard
              title="Bar Chart"
              description="Monthly sales comparison"
              chartType="bar"
              timePeriod={timePeriod}
              data={chartData}
              showActionsMenu
              showTimePeriodSelector
              onTimePeriodChange={handleTimePeriodChange}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
            />
            <ChartCard
              title="Area Chart"
              description="User engagement metrics"
              chartType="area"
              timePeriod={timePeriod}
              data={chartData}
              showActionsMenu
              showTimePeriodSelector
              onTimePeriodChange={handleTimePeriodChange}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
            />
            <ChartCard
              title="Pie Chart"
              description="Traffic sources breakdown"
              chartType="pie"
              data={[
                { label: 'Direct', value: 400 },
                { label: 'Social', value: 300 },
                { label: 'Referral', value: 200 },
                { label: 'Organic', value: 278 },
                { label: 'Email', value: 189 },
              ]}
              showActionsMenu
              colors={['#018940', '#4ae683', '#22c55e', '#16a34a', '#15803d']}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
            />
          </div>
        </section>

        {/* Section: Time Period Variants */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium">Time Period Variants</h2>
            <Badge variant="secondary">3 periods</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <ChartCard
              title="Last Week"
              description="Daily performance"
              chartType="line"
              timePeriod="last-week"
              data={generateSampleData('last-week')}
              showTag
              tagContent="7 days"
              tagVariant="outline"
              chartHeight={220}
            />
            <ChartCard
              title="Last 30 Days"
              description="Monthly overview"
              chartType="line"
              timePeriod="last-30-days"
              data={generateSampleData('last-30-days')}
              showTag
              tagContent="30 days"
              tagVariant="outline"
              chartHeight={220}
            />
            <ChartCard
              title="Last 12 Months"
              description="Yearly trends"
              chartType="line"
              timePeriod="last-12-months"
              data={generateSampleData('last-12-months')}
              showTag
              tagContent="12 months"
              tagVariant="outline"
              chartHeight={220}
            />
          </div>
        </section>

        {/* Section: Card States */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium">Card States</h2>
            <Badge variant="secondary">4 states</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard
              title="Normal State"
              description="Chart displays data normally"
              chartType="bar"
              state="idle"
              data={generateSampleData('last-week')}
              showTag
              tagContent="Live"
              showActionsMenu
              onRefresh={handleRefresh}
              onDownload={handleDownload}
            />
            <ChartCard
              title="Loading State"
              description="Data is being fetched"
              chartType="line"
              state="loading"
              showActionsMenu
              onRefresh={handleRefresh}
            />
            <ChartCard
              title="Empty State"
              description="No data available for display"
              chartType="line"
              state="empty"
              showActionsMenu
              showTimePeriodSelector
              timePeriod={timePeriod}
              onTimePeriodChange={handleTimePeriodChange}
              onRefresh={handleRefresh}
            />
            <ChartCard
              title="Error State"
              description="Failed to load chart data"
              chartType="line"
              state="error"
              errorMessage="Network timeout. Please check your connection and try again."
              showActionsMenu
              onRefresh={handleRefresh}
            />
          </div>
        </section>

        {/* Section: Feature Toggles */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium">Feature Toggles</h2>
            <Badge variant="secondary">Optional features</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard
              title="With Actions Menu"
              description="Click the menu button for options"
              chartType="area"
              data={generateSampleData('last-week')}
              chartHeight={200}
              showActionsMenu
              onRefresh={handleRefresh}
              onDownload={handleDownload}
              onShare={handleShare}
              onFullscreen={handleFullscreen}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
            <ChartCard
              title="With Context Menu"
              description="Right-click for context menu"
              chartType="bar"
              data={generateSampleData('last-week')}
              chartHeight={200}
              showContextMenu
              onRefresh={handleRefresh}
              onDownload={handleDownload}
              onShare={handleShare}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
            <ChartCard
              title="With Display Tag"
              description="Shows status badge indicator"
              chartType="line"
              data={generateSampleData('last-week')}
              chartHeight={200}
              showTag
              tagContent="Live"
              tagVariant="default"
            />
            <ChartCard
              title="With Time Selector"
              description="Change the displayed time range"
              chartType="line"
              data={chartData}
              chartHeight={200}
              showTimePeriodSelector
              timePeriod={timePeriod}
              onTimePeriodChange={handleTimePeriodChange}
            />
            <ChartCard
              title="All Features Enabled"
              description="Menu, context menu, tag, and selector"
              chartType="area"
              data={chartData}
              chartHeight={200}
              showActionsMenu
              showContextMenu
              showTag
              tagContent="Premium"
              tagVariant="secondary"
              showTimePeriodSelector
              timePeriod={timePeriod}
              onTimePeriodChange={handleTimePeriodChange}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
              onShare={handleShare}
              onFullscreen={handleFullscreen}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
            <ChartCard
              title="Minimal Configuration"
              description="No optional features"
              chartType="line"
              data={generateSampleData('last-week')}
              chartHeight={200}
            />
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium">Interactive Demo</h2>
            <Badge variant="secondary">Try it out</Badge>
          </div>
          <InteractiveDemo />
        </section>
      </div>
    </div>
  )
}

// Interactive Demo Component
function InteractiveDemo() {
  const [chartType, setChartType] = React.useState<ChartType>('line')
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>('last-30-days')
  const [state, setState] = React.useState<ChartState>('idle')
  const [showActionsMenu, setShowActionsMenu] = React.useState(true)
  const [showContextMenu, setShowContextMenu] = React.useState(true)
  const [showTag, setShowTag] = React.useState(true)
  const [showTimePeriodSelector, setShowTimePeriodSelector] =
    React.useState(true)

  const [chartData, setChartData] = React.useState(() =>
    generateSampleData('last-30-days')
  )

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period)
    setChartData(generateSampleData(period))
  }

  const handleRefresh = () => {
    setState('loading')
    setTimeout(() => {
      setChartData(generateSampleData(timePeriod))
      setState('idle')
    }, 1500)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <ChartCard
        title="Interactive Chart"
        description="Configure the chart using the controls"
        chartType={chartType}
        timePeriod={timePeriod}
        data={chartType === 'pie' ? [
          { label: 'Category A', value: 400 },
          { label: 'Category B', value: 300 },
          { label: 'Category C', value: 200 },
          { label: 'Category D', value: 278 },
        ] : chartData}
        state={state}
        showActionsMenu={showActionsMenu}
        showContextMenu={showContextMenu}
        showTag={showTag}
        tagContent="Interactive"
        showTimePeriodSelector={showTimePeriodSelector && chartType !== 'pie'}
        onTimePeriodChange={handleTimePeriodChange}
        onRefresh={handleRefresh}
        onDownload={() => console.log('[v0] Download')}
        onShare={() => console.log('[v0] Share')}
        onFullscreen={() => console.log('[v0] Fullscreen')}
        onDuplicate={() => console.log('[v0] Duplicate')}
        onDelete={() => console.log('[v0] Delete')}
        chartHeight={350}
      />
      <div className="space-y-6 rounded-xl border bg-card p-6">
        <h3 className="font-medium">Configuration</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Chart Type</label>
            <Select
              value={chartType}
              onValueChange={(v) => setChartType(v as ChartType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">State</label>
            <Select
              value={state}
              onValueChange={(v) => setState(v as ChartState)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idle">Normal</SelectItem>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="empty">Empty</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm text-muted-foreground">
              Feature Toggles
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={showActionsMenu ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowActionsMenu(!showActionsMenu)}
              >
                Actions Menu
              </Button>
              <Button
                variant={showContextMenu ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowContextMenu(!showContextMenu)}
              >
                Context Menu
              </Button>
              <Button
                variant={showTag ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowTag(!showTag)}
              >
                Display Tag
              </Button>
              <Button
                variant={showTimePeriodSelector ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  setShowTimePeriodSelector(!showTimePeriodSelector)
                }
              >
                Time Selector
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleRefresh} className="w-full">
              Simulate Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
