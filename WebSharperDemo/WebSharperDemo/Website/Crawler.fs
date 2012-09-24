namespace Website

open System
open System.Collections.Concurrent
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.JQuery
open IntelliFactory.WebSharper.Formlet
open Spidy.Types
open Spidy.Crawler

module Crawler =
    
    module Server =
        
        let httpDataFunc (bag : ConcurrentBag<_>) (httpData : HttpData) =
            async {
                let requestUri = httpData.RequestUri
                let statusCode = httpData.StatusCode.ToString()
                let contentType = httpData.ContentType |> function Some x -> x | _ -> ""
                bag.Add (requestUri, statusCode, contentType)
            }
        
        let completionFunc = async { return () }

        let genConfig uri bag =
            Uri.TryCreate(uri, UriKind.Absolute) |> function
                | false, _ ->
                    Uri.TryCreate(("http://" + uri), UriKind.Absolute) |> function
                        | false, _ -> None
                        | true , x -> Some x
                | true , x -> Some x
            |> function
                | None -> None
                | Some x ->
                    Some {
                        Seeds          = [x]
                        Depth          = None
                        Limit          = Some 10
                        RogueMode      = RogueMode.OFF
                        AllowedHosts   = None
                        HttpDataFunc   = httpDataFunc bag
                        CompletionFunc = completionFunc
                    }

        [<RpcAttribute>]
        let crawl' uri =
            async {
                try
                    let bag = ConcurrentBag<string * string * string>()
                    let configOption = genConfig uri bag
                    match configOption with
                        | None        -> return None
                        | Some config ->
                            let! canceler = crawl config
                            let! _ =  Async.AwaitEvent CrawlingCompleted
                            let arr = bag.ToArray() |> Some
                            return arr
                with _ -> return Some [||]
            }

    module Client =
    
        [<JavaScriptAttribute>]
        let removeRows (selector : string) = 
            JQuery.Of(selector).Each(fun (elem : Dom.Element) idx ->
                if idx = 0 then () else JQuery.Of(elem).Remove().Ignore).Ignore

        [<JavaScriptAttribute>]
        let clearTable () = removeRows "#table tr"

        [<JavaScriptAttribute>]
        let focusInput () = JQuery.Of(Dom.Document.Current).Ready(fun _ -> JQuery.Of("#seed").Focus().Ignore).Ignore

        [<JavaScriptAttribute>]
        let appendTd text (tableRow : JQuery) =
            JQuery.Of("<td/>").Text(text).AppendTo(tableRow).Ignore
    
        [<JavaScriptAttribute>]
        let tableRow requestUri statusCode contentType =
            let tr  = JQuery.Of("<tr/>")
            appendTd requestUri  tr
            appendTd statusCode  tr
            appendTd contentType tr
            tr
    
        [<JavaScriptAttribute>]
        let displayData data (selector : string) =
            data
            |> Array.map (fun (x, y, z) -> tableRow x y z)
            |> Array.iter (fun x -> x.AppendTo(JQuery.Of(selector)).Ignore)

        [<JavaScriptAttribute>]
        let urlForm () =

            let urlInput =
                Input [Id "seed"]
                |>! OnKeyDown (fun _ key ->
                    let key' = key.KeyCode
                    match key' with
                        | 13 -> JQuery.Of("#submitButton").Click().Ignore
                        | _  -> ())

            let submitBtn =
                Button [Default.Text "Submit"; Id "submitButton"; Default.Attr.Class "btn btn-primary"]
                |>! OnClick (fun _ _ ->
                    async {
                        clearTable ()
                        let url = urlInput.Value
                        let loaderJquery = JQuery.Of("#loader")
                        loaderJquery.Css("visibility", "visible").Ignore
                        let! dataOption = Server.crawl' url
                        loaderJquery.Css("visibility", "hidden").Ignore
                        match dataOption with
                            | None      -> JavaScript.Alert "The URL is not valid."
                            | Some data ->
                                match data.Length with
                                    | 0 -> JavaScript.Alert "Crawling failed, check the provided URL."
                                    | _ -> displayData data "#table"
                    } |> Async.Start)

            let urlInputFormlet =
                Formlet.OfElement(fun _ -> urlInput)
                |> Enhance.WithTextLabel "URL:"

            let submitBtnFormlet = Formlet.OfElement (fun _ -> submitBtn)

            let form =
                Formlet.Yield (fun _ _ -> ())
                <*> urlInputFormlet
                <*> submitBtnFormlet
                |> Enhance.WithFormContainer

            Formlet.Run (fun _ -> ()) form
        
    type CrawlerFormViewer () =
        inherit Web.Control ()
        [<JavaScriptAttribute>]
        override this.Body =
            Client.focusInput ()
            Client.urlForm ()