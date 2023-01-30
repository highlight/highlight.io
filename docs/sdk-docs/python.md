---
title: Python SDK API Reference
slug: python
---

<section className="section">
  <div className="left">
    <h3>Python SDK</h3>
    <p>
      Highlight's Python SDK makes it easy to monitor errors and metrics on your Python backend.
    </p>
  </div>
  <div className="right">
    <h6>Just getting started?</h6>
    <p>Check out our [getting started guide](/getting-started/backend-sdk/python) to get up and running quickly.</p>
  </div>
</section>

        :param project_id: a string that corresponds to the verbose id of your project from app.highlight.io/setup
        :param integrations: a list of Integrations that allow connecting with your framework, like Flask or Django.
        :param record_logs: set True if you would like python logging to be recorded as part of the session.


<section className="section">
  <div className="left">
    <h3>highlight_io.H</h3>
    <p>highlight_io.H() initializes the Highlight backend SDK.</p>
    <h6>Method Parameters</h6>
    <aside className="parameter">
      <h5>project_id<code>string</code> <code>required</code></h5>
      <p>The id of your project from app.highlight.io/setup</p>
    </aside>
    <aside className="parameter">
      <h5>integrations<code>Integration</code> <code>optional</code></h5>
      <p>A list of integration instances.</p>
      <article className="innerParameterContainer">
        <aside className="innerParameterHeading">Integration properties</aside>
      </article>
    </aside>
    <aside className="parameter">
      <h5>record_logs<code>boolean</code> <code>optional</code></h5>
      <p>If enabled, Highlight will record log output from the <code>logging</code> module.</p>
    </aside>
  </div>
  <div className="right">
    <code>
      import highlight_io
        
      app = Flask(__name__)
      H = highlight_io.H(
      "YOUR-PROJECT-ID", record_logs=True
      )
    </code>
  </div>
</section>
