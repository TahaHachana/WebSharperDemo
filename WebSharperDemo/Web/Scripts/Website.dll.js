(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Html,Operators,Default,List,jQuery,document,Website,Slideshow;
 Runtime.Define(Global,{
  Website:{
   Slideshow:{
    image:function(path,alt)
    {
     var _this,_this1,_this2,_this3;
     return Operators.add(Default.Div(List.ofArray([Default.Attr().Class("slide")])),List.ofArray([Default.Img(List.ofArray([(_this=Default.Attr(),_this.NewAttr("src",path)),(_this1=Default.Attr(),_this1.NewAttr("alt",alt)),(_this2=Default.Attr(),_this2.NewAttr("width","560")),(_this3=Default.Attr(),_this3.NewAttr("height","263"))]))]));
    },
    main:function()
    {
     return jQuery(document).ready(function()
     {
      var currentPosition,slides,numberOfSlides,manageControls;
      currentPosition={
       contents:0
      };
      slides=jQuery(".slide");
      numberOfSlides=slides.length;
      jQuery("#slidesContainer").css("overflow","hidden");
      slides.wrapAll("<div id=\"slideInner\"></div>").css("float","left").css("width",Global.String(560));
      jQuery("#slideInner").css("width",Global.String(560*numberOfSlides));
      jQuery("#slideInner").prepend("<span class=\"control\" id=\"leftControl\">Move left</span>").append("<span class=\"control\" id=\"rightControl\">Move right</span>");
      manageControls=function(position)
      {
       if(position.contents===0)
        {
         jQuery("#leftControl").hide();
        }
       else
        {
         jQuery("#leftControl").show();
        }
       if(position.contents===numberOfSlides-1)
        {
         return jQuery("#rightControl").hide();
        }
       else
        {
         return jQuery("#rightControl").show();
        }
      };
      jQuery(".control").click(function()
      {
       var current,animation;
       current=jQuery(this).attr("id")==="rightControl";
       if(current)
        {
         currentPosition.contents=currentPosition.contents+1;
        }
       else
        {
         currentPosition.contents=currentPosition.contents-1;
        }
       manageControls(currentPosition);
       animation=560*-currentPosition.contents;
       return jQuery("#slideInner").animate({
        marginLeft:animation
       },300);
      });
      return manageControls(currentPosition);
     });
    },
    slides:function()
    {
     var _this,_this1;
     return Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("id","slideshow"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("id","slidesContainer"))])),List.ofArray([Slideshow.image("Images/img1.jpg","Slide 1"),Slideshow.image("Images/img2.jpg","Slide 2"),Slideshow.image("Images/img3.jpg","Slide 3")]))]));
    }
   },
   SlideshowViewer:Runtime.Class({
    get_Body:function()
    {
     Slideshow.main();
     return Slideshow.slides();
    }
   })
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Operators=Runtime.Safe(Html.Operators);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  jQuery=Runtime.Safe(Global.jQuery);
  document=Runtime.Safe(Global.document);
  Website=Runtime.Safe(Global.Website);
  return Slideshow=Runtime.Safe(Website.Slideshow);
 });
 Runtime.OnLoad(function()
 {
 });
}());
