import { Typography } from '../Typography/Typography'

export const Roadmap = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 12 }}>
      <RoadmapColumn title="Under Consideration" />
      <RoadmapColumn title="Under Consideration" />
      <RoadmapColumn title="Under Consideration" />
    </div>
  )
}

const RoadmapColumn = ({ title }: { title: string }) => {
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          border: '1px solid #30294E',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 0px 8px 0px',
        }}
      >
        {title}
      </div>
      <div style={{ border: '1px solid #30294E', padding: 12 }}>
        <Typography type="copy4">Feature Flag environments to make testing easier</Typography>

        <div></div>
      </div>
      <div>hello</div>
    </div>
  )
}
