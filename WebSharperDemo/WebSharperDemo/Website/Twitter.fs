namespace Website

open IntelliFactory.WebSharper

module Twitter =
    
//    [<JavaScript>]
    module Client =

//        open IntelliFactory.WebSharper.EcmaScript
        open IntelliFactory.WebSharper.Html
        open IntelliFactory.WebSharper.JQuery

        type Tweet =
            {
                CreatedAt            : string
                FromUser             : string
                FromUserIdId         : string
                FromUserIdIdStr      : string
                FromUserName         : string
                Geo                  : string
                Id                   : string
                IdStr                : string
                IsoLanguageCode      : string
                Metadata             : obj
                ProfileImageUrl      : string
                ProfileImageUrlHttps : string
                Source               : string
                Text                 : string
            }

        type Result =
            {
                CompletedIn    : string
                MaxId          : string
                MaxIdStr       : string
                NextPage       : string
                Page           : string
                Query          : string
                RefreshUrl     : string
                Results        : Tweet []
                ResultsPerPage : string
                SinceId        : string
                SinceIdStr     : string
            }

        [<JavaScript>]
        let atRegex   = EcmaScript.RegExp("(@)([A-Za-z0-9-_]+)", "g")
        [<JavaScript>]
        let hashRegex = EcmaScript.RegExp("(#)([A-Za-z0][A-Za-z0-9-_]+)", "g")
        [<JavaScript>]
        let urlRegex  = EcmaScript.RegExp("([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&amp;;\?\/.=]+)", "g")

        [<JavaScript>]
        let replaceUsers (str : string) = EcmaScript.String(str).Replace(atRegex, "<a href=\"https://twitter.com/$2\" target=\"_blank\">@$2</a>")
        [<JavaScript>]
        let replaceHashs (str : string) = EcmaScript.String(str).Replace(hashRegex, "<a href=\"https://twitter.com/search/?q=%23$2\" target=\"_blank\">#$2</a>")
        [<JavaScript>]
        let replaceUrls (str : string) = EcmaScript.String(str).Replace(urlRegex, "<a href=\"$1\" target=\"_blank\">$1</a>")

        [<JavaScript>]
        let linkify = replaceUrls >> replaceUsers >> replaceHashs

        [<JavaScript>]
        let tweetLi screenName tweetId profileImage fullName tweetHtml creationDate =
            let profileLink  = "https://twitter.com/"                          + screenName
            let replyLink    = "https://twitter.com/intent/tweet?in_reply_to=" + tweetId
            let retweetLink  = "https://twitter.com/intent/retweet?tweet_id="  + tweetId
            let favoriteLink = "https://twitter.com/intent/favorite?tweet_id=" + tweetId
            let p = P []
            p.Html <- tweetHtml
            LI [Attr.Class "tweet"; Attr.Style "clear: both;"] -< [
                Div [
                    A [HRef profileLink; Attr.Class "twitterProfileLink"] -< [
                        Img [Src profileImage; Alt fullName; Attr.Class "avatar"; Height "48"; Width "48"]
                        Strong [Text fullName]
                    ] -< [Text (" @" + screenName)]
                    Br []
                    Small [Text creationDate]
                    p
                    Div [Attr.Class "tweetActions"; Attr.Style "visibility: hidden;"] -< [
                        A [HRef replyLink   ; Attr.Class "tweet-action-link"; Attr.Style "margin-right: 5px;"] -< [Text "Reply"]
                        A [HRef retweetLink ; Attr.Class "tweet-action-link"; Attr.Style "margin-right: 5px;"] -< [Text "Retweet"]
                        A [HRef favoriteLink; Attr.Class "tweet-action-link"]                                  -< [Text "Favorite"]
                    ]
                ]
            ]

        [<JavaScript>]
        let toggleActionsVisibility() =
            let jquery = JQuery.Of ".tweet"
            jquery.Mouseenter(fun x _ ->
                JQuery.Of(".tweetActions", x).Css("visibility", "visible").Ignore).Ignore
            jquery.Mouseleave(fun x _ ->
                JQuery.Of(".tweetActions", x).Css("visibility", "hidden").Ignore).Ignore

        [<JavaScript>]
        let handleTweetActions() =
            let jquery = JQuery.Of "a.tweet-action-link"
            jquery.Click(fun elt event ->
                do event.PreventDefault()
                let href = elt.GetAttribute "href"
                Html5.Window.Self.ShowModalDialog href |> ignore).Ignore

        [<JavaScript>]
        let displayTweets (elt : Element) =       
            JQuery.GetJSON("http://search.twitter.com/search.json?q=%23fsharp&amp;rpp=50&amp;callback=?", (fun (data, _) ->
                let data = As<Result> data
                data.Results
                |> Array.map (fun result ->
                    let tweetHtml = linkify <| result.Text
                    tweetLi result.FromUser result.IdStr result.ProfileImageUrl result.FromUserName tweetHtml result.CreatedAt)
                |> Array.iter elt.Append))

        [<JavaScript>]
        let main() =
            UL [Attr.Class "unstyled"]
            |>! OnAfterRender (fun elt ->
                async {
                    displayTweets elt |> ignore
                    do toggleActionsVisibility()
                    do handleTweetActions()
                } |> Async.Start)

    type Control() =
            
        inherit Web.Control()

        [<JavaScript>]
        override this.Body = Client.main() :> _