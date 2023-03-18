import { GoChiContent } from './backend/go/chi'
import { GoFiberContent } from './backend/go/fiber'
import { GoGinContent } from './backend/go/gin'
import { GoGqlgenContent } from './backend/go/go-gqlgen'
import { GoMuxContent } from './backend/go/mux'
import { JSApolloContent } from './backend/js/apollo'
import { JSCloudflareContent } from './backend/js/cloudflare'
import { JSExpressContent } from './backend/js/express'
import { JSFirebaseContent } from './backend/js/firebase'
import { JSNestContent } from './backend/js/nestjs'
import { JSNodeContent } from './backend/js/nodejs'
import { JStRPCContent } from './backend/js/trpc'
import { PythonAWSContext } from './backend/python/aws'
import { PythonAzureContext } from './backend/python/azure'
import { PythonDjangoContext } from './backend/python/django'
import { PythonFastAPIContext } from './backend/python/fastapi'
import { PythonFlaskContext } from './backend/python/flask'
import { PythonGCPContext } from './backend/python/gcp'
import { PythonOtherContext } from './backend/python/other'
import { AngularContent } from './frontend/angular'
import { GatsbyContent } from './frontend/gatsby'
import { NextContent } from './frontend/next'
import { OtherContext } from './frontend/other'
import { ReactContent } from './frontend/react'
import { VueContent } from './frontend/vue'
import { GoLogrusContent } from './logging/go/logrus'
import { GoOtherLogContent } from './logging/go/other'
import { HTTPContent } from './logging/http'
import { JSNestLogContent } from './logging/js/nestjs'
import { JSOtherLogContent } from './logging/js/other'
import { PythonOtherLogContent } from './logging/python/other'
import { DevDeploymentContent } from './self-host/dev-deploy'
import { SelfHostContent } from './self-host/self-host'

export type QuickStartContent = {
  title: string
  subtitle: string
  entries: Array<QuickStartStep>
}

export type QuickStartStep = {
  title: string
  content: string
  code?: {
    text: string
    language: string
  }
  hidden?: true
}

export enum QuickStartType {
  Angular = 'angular',
  React = 'react',
  Next = 'next',
  Vue = 'vue',
  Gatsby = 'gatsby',
  SelfHost = 'self-host',
  DevDeploy = 'dev-deploy',
  Other = 'other',
  PythonFlask = 'flask',
  PythonDjango = 'django',
  PythonFastAPI = 'fastapi',
  PythonOther = 'other',
  PythonAWSFn = 'aws-lambda',
  PythonAzureFn = 'azure-functions',
  PythonGCPFn = 'google-cloud-functions',
  GoGqlgen = 'gqlgen',
  GoFiber = 'fiber',
  GoChi = 'chi',
  GoMux = 'mux',
  GoGin = 'gin',
  GoLogrus = 'logrus',
  GoOther = 'other',
  JSApollo = 'apollo',
  JSCloudflare = 'cloudflare',
  JSExpress = 'express',
  JSFirebase = 'firebase',
  JSNodejs = 'nodejs',
  JSNestjs = 'nestjs',
  JStRPC = 'trpc',
  HTTPOTLP = 'http/otlp',
}

export const quickStartContent = {
  client: {
    [QuickStartType.Angular]: AngularContent,
    [QuickStartType.React]: ReactContent,
    [QuickStartType.Next]: NextContent,
    [QuickStartType.Vue]: VueContent,
    [QuickStartType.Gatsby]: GatsbyContent,
    [QuickStartType.Other]: OtherContext,
  },
  server: {
    python: {
      [QuickStartType.PythonFlask]: PythonFlaskContext,
      [QuickStartType.PythonDjango]: PythonDjangoContext,
      [QuickStartType.PythonFastAPI]: PythonFastAPIContext,
      [QuickStartType.PythonOther]: PythonOtherContext,
      [QuickStartType.PythonAWSFn]: PythonAWSContext,
      [QuickStartType.PythonAzureFn]: PythonAzureContext,
      [QuickStartType.PythonGCPFn]: PythonGCPContext,
    },
    go: {
      [QuickStartType.GoGqlgen]: GoGqlgenContent,
      [QuickStartType.GoFiber]: GoFiberContent,
      [QuickStartType.GoChi]: GoChiContent,
      [QuickStartType.GoMux]: GoMuxContent,
      [QuickStartType.GoGin]: GoGinContent,
    },
    js: {
      [QuickStartType.JSApollo]: JSApolloContent,
      [QuickStartType.JSCloudflare]: JSCloudflareContent,
      [QuickStartType.JSExpress]: JSExpressContent,
      [QuickStartType.JSFirebase]: JSFirebaseContent,
      [QuickStartType.JSNodejs]: JSNodeContent,
      [QuickStartType.JSNestjs]: JSNestContent,
      [QuickStartType.JStRPC]: JStRPCContent,
    },
  },
  'server-logging': {
    python: {
      [QuickStartType.PythonOther]: PythonOtherLogContent,
    },
    go: {
      [QuickStartType.GoLogrus]: GoLogrusContent,
      [QuickStartType.GoOther]: GoOtherLogContent,
    },
    js: {
      [QuickStartType.JSNodejs]: JSOtherLogContent,
      [QuickStartType.JSNestjs]: JSNestLogContent,
    },
    [QuickStartType.HTTPOTLP]: HTTPContent,
  },
  other: {
    [QuickStartType.SelfHost]: SelfHostContent,
    [QuickStartType.DevDeploy]: DevDeploymentContent,
  },
} as const
