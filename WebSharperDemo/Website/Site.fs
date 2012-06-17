namespace Website

open IntelliFactory.Html
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Sitelets

type Action =
    | Home
    | Slideshow

module Skin =
    open System.Web

    let TemplateLoadFrequency =
        #if DEBUG
        Content.Template.PerRequest
        #else
        Content.Template.Once
        #endif

    type Page =
        {
            Title : string
            Body : list<Content.HtmlElement>
        }

    let MainTemplate =
        let path = HttpContext.Current.Server.MapPath("~/Main.html")
        Content.Template<Page>(path, TemplateLoadFrequency)
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)

    let WithTemplate title body : Content<Action> =
        Content.WithTemplate MainTemplate <| fun context ->
            {
                Title = title
                Body = body context
            }

module Site =

    let ( => ) text url =
        A [HRef url] -< [Text text]

    let Links (ctx: Context<Action>) =
        UL [
            LI ["Slideshow" => ctx.Link Slideshow]
        ]

    let HomePage =
        Skin.WithTemplate "WebSharper Demo" <| fun ctx ->
            [
                Links ctx
            ]

    let SlideshowPage =
        Skin.WithTemplate "WebSharper Slideshow" <| fun ctx ->
            [
                LI ["Home" => ctx.Link Home]
                Div [new Website.SlideshowViewer ()]
            ]

    let Main =
        Sitelet.Sum [
            Sitelet.Content "/" Home HomePage
            Sitelet.Content "/Slideshow" Slideshow SlideshowPage
        ]

type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.Main
        member this.Actions = [Home; Slideshow]

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()