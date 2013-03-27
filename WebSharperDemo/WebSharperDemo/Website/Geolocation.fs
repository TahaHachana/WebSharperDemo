namespace Website

module Geolocation =

    open IntelliFactory.WebSharper
    open IntelliFactory.WebSharper.Google.Maps
    open IntelliFactory.WebSharper.Html
    open IntelliFactory.WebSharper.Html5
    open IntelliFactory.WebSharper.JQuery

    [<JavaScript>]
    let position() : (Async<Html5.Position>) =
        Async.FromContinuations(fun (onOk, _, _) ->
            Html5.Window.Self.Navigator.Geolocation.GetCurrentPosition(fun pos ->
                onOk pos
            )
        )

    [<JavaScript>]
    let main() =
        let div =
            Div [Attr.Style "padding-bottom:20px; width:500px; height:300px;"]
            |>! OnAfterRender(fun elt ->
                let center = LatLng(37.4419, -122.1419)
                let options = MapOptions(14, center, MapTypeId.ROADMAP)
                let map = Google.Maps.Map(elt.Body, options)
                JQuery.Of("#locate-me").Click(fun _ _ ->
                    async {
                        let! position = position()
                        let coords = position.Coords                
                        let center = LatLng(coords.Latitude, coords.Longitude)
                        map.PanTo center
                        let markerOptions = MarkerOptions center
                        markerOptions.Map <- map
                        let marker = Marker markerOptions
                        let req = GeocoderRequest(Bounds = LatLngBounds(center))
                        let addressElt = Address [Text ""]
                        Geocoder().Geocode(req, (fun (results, status) ->
                            match status with
                                | _ when status = GeocoderStatus.OK ->
                                    let address =
                                        results.[0].Address_components
                                        |> Array.map (fun x -> x.Short_name)
                                        |> String.concat ", "
                                    addressElt.Html <- address
                                | _ -> ()))
                        let iwOptions = new InfoWindowOptions()
                        iwOptions.Content <- addressElt.Body
                        iwOptions.Position <- center
                        let iw = new InfoWindow(iwOptions)
                        Event.AddListener(marker, "click", (fun _ -> iw.Open(map))) |> ignore
                    }
                    |> Async.Start).Ignore)
        let btn = Button [Id "locate-me"; Attr.Class "btn btn-large btn-primary"] -< [Text "Locate Me"]
        Div [
            div
            btn
        ]

    type Viewer() =

        inherit Web.Control()

        [<JavaScript>]
        override __.Body = main() :> _