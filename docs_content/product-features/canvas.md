---
title: Canvas
slug: -46L-canvas
createdAt: 2021-10-13T22:55:19.000Z
updatedAt: 2022-09-29T18:01:58.000Z
---

:::hint
We are actively working on improving recording of canvas elements. If you have any questions or suggestions please reach out to us at support@highlight.run
:::

Highlight by default does not record the contents of `<canvas>` elements. This is usually why the session replay has blank areas where those areas should be `<canvas>` elements. We provide experimental recording of `<canvas>` contents.&#x20;

Ensure you have installed [highlight.run >= 4.3.6](https://www.npmjs.com/package/highlight.run/v/4.3.6). Enable canvas recording by configuring [H.init()](docId\:yo4FQx3odAtsQsbZOuG_m).

```javascript
H.init('YOUR_PROJECT_ID', {
    enableCanvasRecording: true,
    samplingStrategy: { canvas: 15, canvasQuality: 'low', canvasMaxSnapshotDimension: 480 }, 
});
```

`samplingStrategy.canvas` is the frame per second rate used to record the HTML canvas. We recommend a value < 5 to ensure recording performance is not impacted at high resolutions.

`samplingStrategy.canvasQuality`: 'pixelated' | 'low' | 'medium' | 'high'. This value represents the image compression quality and will affect the size of the canvas images uploaded.

`samplingStrategy.canvasMaxSnapshotDimension`: max recording resolution of the largest dimension of the canvas.

Snapshotting at full resolution and high FPS can produce too much data for our client to upload on devices with low upload bandwidth. We've found that with a safe assumption of upload speed @, 1 MB/s I can support the above snapshotting settings without a problem at 480p 15 fps.

Even though this feature is experimental, it should not have any impact on your application. We've recently changed our uploading client to use browser web-workers to ensure that data serialization cannot block the rendering of your application. If you run into any issues please let us know!

## Caveats

*   [Privacy](docId\:Nwmpmz7WSlvHP61e3RQSd) controls do not apply to canvas recording right now

