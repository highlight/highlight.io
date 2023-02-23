---
title: Go Backend
slug: go-backend
createdAt: 2022-03-28T20:31:15.000Z
updatedAt: 2022-04-06T20:22:54.000Z
---

Highlight supports several server frameworks written in Go.

`99designs/gqlgen`
`gin-gonic/gin`
`go-chi/chi`
`gofiber/fiber`
`gorilla/mux`

First, install and import the go package in your entrypoint.

```shell
go get -u github.com/highlight/highlight/sdk/highlight-go
```

Add the following lines to your application's main (`func main`) function:

```go
import (
	"github.com/highlight/highlight/sdk/highlight-go"
)

func main() {
	//...application logic...
	highlight.Start()
	defer highlight.Stop()
	highlight.SetProjectID("YOUR_PROJECT_ID")
	//...application logic...
}

```

This configures highlight to transmit any relevant events or errors as they may happen. You can also customize highlight by using the public highlight methods before calling `Start()`. However, we still need to associate your users' sessions with potential backend errors. We provide middleware packages that help set this up:

Add the following middleware to your router:

## Go Gin

```go
package main

import (
	H "github.com/highlight/highlight/sdk/highlight-go"
	highlightGin "github.com/highlight/highlight/sdk/highlight-go/middleware/gin"
)

func main() {
	H.SetProjectID("YOUR_PROJECT_ID")
	H.Start()
	defer H.Stop()
	//...
	r := gin.Default()
	r.Use(highlightGin.Middleware())
	//...
}

```

## Go Chi

```go
package main

import (
	H "github.com/highlight/highlight/sdk/highlight-go"
	highlightChi "github.com/highlight/highlight/sdk/highlight-go/middleware/chi"
)

func main() {
	H.SetProjectID("YOUR_PROJECT_ID")
	H.Start()
	defer H.Stop()
	//...
	r := chi.NewRouter()
	r.Use(highlightChi.Middleware)
	//...
}
```

## Go Fiber

```go
package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	H "github.com/highlight/highlight/sdk/highlight-go"
	highlightFiber "github.com/highlight/highlight/sdk/highlight-go/middleware/fiber"
	"log"
)

func main() {
	H.SetProjectID("YOUR_PROJECT_ID")
	H.Start()
	defer H.Stop()

	app := fiber.New()
	app.Use(logger.New())
	app.Use(highlightFiber.Middleware())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	log.Fatal(app.Listen(":3456"))
}

```

## Gorilla Mux

```go
package main

import (
	H "github.com/highlight/highlight/sdk/highlight-go"
	highlightgorilla "github.com/highlight/highlight/sdk/highlight-go/middleware/gorillamux"
)

func main() {
	H.SetProjectID("YOUR_PROJECT_ID")
	H.Start()
	defer H.Stop()
	//...
	r := mux.NewRouter()
	r.Use(highlightgorilla.Middleware)
	//...
}
```

## 99designs gqlgen

```go
package main

import (
	ghandler "github.com/99designs/gqlgen/graphql/handler"
	H "github.com/highlight/highlight/sdk/highlight-go"
)

func main() {
	H.SetProjectID("YOUR_PROJECT_ID")
	H.Start()
	defer H.Stop()
	
	server := ghandler.New(...)
	server.Use(H.NewGraphqlTracer(string(util.PrivateGraph)))	
}
```

## Verifying

Great! Now that you've set up the Middleware, verify that the backend error handling works by consuming an error from your handler.
If you are using `99designs/gqlgen`, this is as easy as having a resolver return an error.
If you are using `gofiber`, this is as easy as having a route handler return an error.
With simpler HTTP frameworks, you'll need to manually `highlight.ConsumeError`, as in the following example for `chi`.

```go

package main

// go chi example
import (
	"errors"
	"github.com/go-chi/cors"
	"github.com/highlight/highlight/sdk/highlight-go"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	highlightChi "github.com/highlight/highlight/sdk/highlight-go/middleware/chi"
)

func main() {
	highlight.Start()
	defer highlight.Stop()
	highlight.SetProjectID("YOUR_PROJECT_ID")

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
```
