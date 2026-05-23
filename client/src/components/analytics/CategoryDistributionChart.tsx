import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { CategoryDistributionItem } from '../../utils/analytics'
import { formatNumber, formatRating } from '../../utils/formatters'

const CHART_COLORS = [
  '#0f172a',
  '#1d4ed8',
  '#0f766e',
  '#9333ea',
  '#d97706',
  '#dc2626',
  '#475569',
]

type CategoryDistributionChartProps = {
  categories: CategoryDistributionItem[]
}

function CategoryDistributionChart({
  categories,
}: CategoryDistributionChartProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="label"
              innerRadius={72}
              outerRadius={112}
              paddingAngle={3}
            >
              {categories.map((category, index) => (
                <Cell
                  key={category.slug}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, _name, payload) => [
                `${formatNumber(Number(value ?? 0))} products`,
                payload?.payload?.label ?? 'Category',
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <div
            key={category.slug}
            className="flex items-center justify-between rounded-2xl bg-slate-50/90 px-4 py-3 dark:bg-slate-800/70"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {category.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatNumber(category.value)} products
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {formatRating(category.share)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryDistributionChart
