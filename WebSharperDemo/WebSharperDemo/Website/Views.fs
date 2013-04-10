namespace Website

module Views =

    open IntelliFactory.Html
    open IntelliFactory.WebSharper.Sitelets.Content
    open ExtSharper
    open Model
    open Utils.Server

    let private footer : HtmlElement =
        HTML5.Footer [Id "footer"] -< [
            Div [Class "container"; Style "padding-top: 20px;"] -< [
                P [Text "Powered by "] -< [A [HRef "http://www.websharper.com/"] -< [Text "WebSharper"]]
            ]            
        ]

    let private mainTemplate = Skin.MakeDefaultTemplate "~/Main.html" Skin.LoadFrequency.Once 
    let private withMainTemplate = Skin.WithTemplate<Action> mainTemplate

    let home =
        withMainTemplate "WebSharper Demos" "" <| fun ctx ->
            [
                Div [Class "wrap"] -< [
                    navigation <| Some "Home"
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Class "row"; Style "margin-bottom: 60px;"] -< [
                            Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Slideshow]   -< [Text "Slideshow"]]
                            Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Crawler]     -< [Text "Web Crawler"]]
                            Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Html5Logo]   -< [Text "Canvas Drawing"]]
                        ]
                        Div [Class "row"] -< [
                            Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Geolocation] -< [Text "Geolocation"]]
                            Div [Class "span4"] -< [A [Class "btn btn-large home-btn"; HRef <| ctx.Link Twitter] -< [Text "Twitter Widget"]]
                        ]
                    ]
                ]
                footer
            ]

    let crawler =
        withMainTemplate "F# Web Crawler" "" <| fun ctx ->
            [
                Div [Class "wrap"] -< [
                    navigation None
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Class "page-header"] -< [H1 [Text "F# Web Crawler"]]
                        P [Text "Enter a URL for the crawler to use as a seed. For demo purposes, only the first 10 dicovered pages are displayed."]
                        Div [new Crawler.Client.Viewer()]
                        Div [] -< [Img [Src "Images/Crawler/Loader.gif"; Class "loader"; Id "loader"]]
                        Div [] -< [
                            Table [Id "table"; Class "table table-bordered table-striped"] -< [
                                TR [] -< [
                                    TH [Class "url"] -< [Text "URL"]
                                    TH [Text "Status Code"]
                                    TH [Text "Content Type"]
                                ]
                            ]
                        ]
                    ]
                ]
                footer
            ]
        
    let custom404 =
        withMainTemplate "Error - Page Not Found" "" <| fun ctx ->
            [
                Div [Class "wrap"] -< [
                    navigation None
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Text "The page you're trying to access doesn't exist."]
                    ]
                ]
                footer
            ]

    let html5Logo =
        withMainTemplate "Drawing On The Canvas With WebSharper" "" <| fun ctx ->
            [
                Div [Class "wrap"] -< [
                    navigation None
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Class "page-header"] -< [
                            H1 [Text "Drawing the HTML5 logo on the canvas"]
                        ]
                        Div [Class "offset3"] -< [new Html5Logo.Client.Viewer()]
                    ]
                ]
                footer
            ]

    let slideshow =
        withMainTemplate "WebSharper Slideshow | WebSharper Carousel" "" <| fun ctx ->
            [
                Div [Class "wrap"] -< [
                    navigation None
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Class "page-header"] -< [
                            H1 [Text "WebSharper Slideshow"]
                        ]
                        Div [new Slideshow.Viewer ()]
                    ]
                ]
                footer
            ]

    let geolocation =
        withMainTemplate "WebSharper Geolocation Demo" "" <| fun ctx ->
            [
                Div [Class "wrap"] -< [                
                    navigation None
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Class "page-header"] -< [
                            H1 [Text "Reverse geocoding with the Google Maps API"]
                            Small [Text "Accuracy depends on many factors (browser, device ...)"]
                        ]
                        Div [new Geolocation.Viewer ()]
                    ]
                ]
                footer
            ]

    let twitter =
        withMainTemplate "WebSharper Twitter Widget" "A custom Twitter widget built with WebSharper." <| fun ctx ->
            [
                Div [Class "wrap"] -< [
                    navigation None
                    Div [new Forkme.Viewer()]
                    Div [Class "container"; Id "push"] -< [
                        Div [Class "page-header"] -< [
                            H1 [Text "Custom Twitter widget"]
                        ]
                        Div [Class "span6"] -< [
                            H2 [Class "text-center"] -< [Text "Latest #fsharp Tweets"]
                            Div [Id "tweets-div"] -< [new Twitter.Control()]
                        ]
                    ]
                ]
                footer
            ]