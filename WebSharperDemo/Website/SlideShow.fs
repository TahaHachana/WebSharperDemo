namespace Website

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.JQuery

module Slideshow =

    [<JavaScriptAttribute>]
    let image path alt =
        Div [Attr.Class "slide"] -<
            [ Img [Attr.Src path; Attr.Alt alt; Attr.Width "560"; Attr.Height "263"] ]

    [<JavaScriptAttribute>]
    let slides () =
        Div [Attr.Id "slideshow"] -< [
            Div [Attr.Id "slidesContainer"] -< [
                image "Images/img1.jpg" "Slide 1"
                image "Images/img2.jpg" "Slide 2"
                image "Images/img3.jpg" "Slide 3"

//                Div [Attr.Class "slide"] -<
//                    [ Img [Attr.Src "Images/img1.jpg"; Attr.Alt ""; Attr.Width "560"; Attr.Height "263"] ]
//                Div [Attr.Class "slide"] -<
//                    [ Img [Attr.Src "Images/img2.jpg"; Attr.Alt ""; Attr.Width "560"; Attr.Height "263"] ]
//                Div [Attr.Class "slide"] -<
//                    [ Img [Attr.Src "Images/img3.jpg"; Attr.Alt ""; Attr.Width "560"; Attr.Height "263"] ]
                ]
            ]

    type AnimateConfiguration = { marginLeft : int }

    [<JavaScriptAttribute>]
    let main () =
        JQuery.Of(Dom.Document.Current).Ready(fun () ->
            let currentPosition = ref 0
            let slideWidth = 560
            let slides = JQuery.Of(".slide")
            let numberOfSlides = slides.Length
            JQuery.Of("#slidesContainer").Css("overflow", "hidden").Ignore
            slides
              .WrapAll("<div id=\"slideInner\"></div>")
              .Css("float", "left").Css("width", string slideWidth).Ignore
            JQuery.Of("#slideInner").Css("width", string (slideWidth * numberOfSlides)).Ignore
            JQuery.Of("#slideInner")
                .Prepend("<span class=\"control\" id=\"leftControl\">Move left</span>")
                .Append("<span class=\"control\" id=\"rightControl\">Move right</span>").Ignore
            let manageControls position =
                if (!position = 0) then JQuery.Of("#leftControl").Hide().Ignore
                else JQuery.Of("#leftControl").Show().Ignore
                if (!position = (numberOfSlides - 1)) then JQuery.Of("#rightControl").Hide().Ignore
                else JQuery.Of("#rightControl").Show().Ignore

            JQuery.Of(".control").Click(fun x y ->
                let current = JQuery.Of(x).Attr("id") = "rightControl"
                if current then currentPosition := (!currentPosition + 1) else currentPosition := (!currentPosition - 1)
                manageControls currentPosition
                let animation = slideWidth * (- !currentPosition)
                JQuery.Of("#slideInner").Animate({ marginLeft = animation}, 300).Ignore).Ignore
            manageControls currentPosition).Ignore

type SlideshowViewer () =
    inherit Web.Control ()

    [<JavaScriptAttribute>]
    override this.Body =
        Slideshow.main ()
        Slideshow.slides () :> _