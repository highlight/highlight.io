---
title: Go Backend
slug: go-backend
createdAt: 2022-03-28T20:31:15.000Z
updatedAt: 2022-04-06T20:22:54.000Z
---

Highlight supports several server frameworks written in Go.

`go-chi/chi`
`gin-gonic/gin`

# Usage

First, install and import the go package in your entrypoint.

```shell
go get -u github.com/highlight-run/highlight-go
```

Add the following lines to your application's main (`func main`) function:

```go
import (
	"github.com/highlight-run/highlight-go"
)

func main() {
	//...application logic...
	highlight.Start()
	defer highlight.Stop()
	//...application logic...
}

```

This configures highlight to transmit any relevant events or errors as they may happen. You can also customize highlight by using the public highlight methods before calling `Start()`. However, we still need to associate your users' sessions with potential backend errors. We provide middleware packages that help set this up:

### Middleware

Add the following middleware to your router:

```go
// with chi
import (
	highlightChi "github.com/highlight-run/highlight-go/middleware/chi"
)

func main() {
	//...
	r := chi.NewRouter()
	r.Use(highlightChi.Middleware)
	//...
}

// with gin
import (
	highlightGin "github.com/highlight-run/highlight-go/middleware/gin"
)

func main() {
	//...
	r := gin.Default()
	r.Use(highlightGin.Middleware())
	//...
}

```

## Instrumenting Handlers

Great! Now we've configured the highlight client and can track sessions from the frontend to the backend. All we need to do now is instrument our backend code to transmit events or errors where relevant.

```go

package main

// with chi
import (
	"errors"
	"github.com/go-chi/cors"
	"github.com/highlight-run/highlight-go"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	highlightChi "github.com/highlight-run/highlight-go/middleware/chi"
)

func main() {
	highlight.Start()
	defer highlight.Stop()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(highlightChi.Middleware)
	// setup cors if necessary for your frontend
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:3001"},
		AllowedHeaders: []string{"X-Highlight-Request"},
	}))

	r.Get("/ping", PingHandler)
	http.ListenAndServe("0.0.0.0:8080", r)
}

var appHealthy = false

func PingHandler(w http.ResponseWriter, r *http.Request) {
	// we can instrument our handlers directly to record events or error
	if !appHealthy {
		highlight.ConsumeError(r.Context(), errors.New("a health check failure occured!"))
	}
	w.Write([]byte("welcome"))
}

// with gin
import (
	"errors"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/highlight-run/highlight-go"
	highlightGin "github.com/highlight-run/highlight-go/middleware/gin"
)

func main() {
	highlight.Start()
	defer highlight.Stop()

	r := gin.Default()
	r.Use(highlightGin.Middleware())
	// setup cors if necessary for your frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3001"},
		AllowHeaders: []string{"X-Highlight-Request"},
	}))

	r.GET("/ping", PingHandler)
	r.Run("0.0.0.0:8080") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

var appHealthy = false

func PingHandler(c *gin.Context) {
	// we can instrument our handlers directly to record events or error
	if !appHealthy {
		highlight.ConsumeError(c, errors.New("a health check failure occured!"))
	}
	c.JSON(200, gin.H{
		"message": "Hello, World!",
	})
}
```
