function tp_escape(str) {
    // escape some
    pattern_amp = /&/g;
    pattern_lt = /</g;
    pattern_gt = />/g;
    pattern_para = /\n/g;
    return str
      .replace(pattern_amp, "&amp;")
      .replace(pattern_lt, "&lt;")
      .replace(pattern_gt, "&gt;")
      .replace(pattern_para, "<br>");
  }
  
  var word_string, words; //String = enthält die Wörter; Array(words) = enthält die Wörter aufgesplittet in einem Array
  var row1_string = ""; //enthält die einzugebenen Wörter der 1. Reihe
  var i;
  var word_pointer = 0; //markiert das aktuelle Wort welches getippt werden soll
  var user_input_stream = ""; //sammelt alle Tastatureingaben des Users
  var row_counter = 0; //zählt die Anzahl der Zeilensprünge
  var eingabe; //prüfvariable => alles was im Inputfeld drinsteht wird hier zwischengespeichert und weiterverarbeitet (manchmal reagiert der Keylistener für das Leerzeichen nicht schnell genug, z.b. "hallo w" wird dann übertragen, daher erfolgt zu erst eine weiterverarbeitung)
  var start_time = 0; //die Startzeit in Millisekunden
  var end_time = 0; //die Endzeit in Millisekunden
  var setval = ""; //die Variable für den Timer/setInterval
  var start_time_set = 0; //wurde die Startzeit auf dem Server mittels Ajax schon gesetzt oder nicht
  var line_height = 0; //Höhe des Zeilensprungs
  
  var error_wpm = 0; //fallback if ajax call fails => user can still see his result
  var error_keystrokes = 0;
  var error_correct = 0;
  var error_wrong = 0;
  var backspace_counter = 0;
  
  var _gaq = _gaq || [];
  
  var keys = {}; //liest die gedrückten Tasten ein, wird genutzt für Mac/Safari "Smart" Reload
  
  var input_key_value = 32; //$("#config_input_key").attr("value");
  var $inputfield = $("#text_typed").removeClass("hidden");
  var $row1 = $("#row1");
  var $row1_span_wordnr;
  
  var ended = false;
  var started = false;
  
  var scrolldiff = 0;
  var startpos = 0;
  var last_scroll = 0;
  
  var original_placeholder = "";
  var eingabe;
  
  $(document).ready(function () {
    cache_elements();
    restart();
    activate_keylistener();
  
    show_average_rating();
    show_fav_function();
  });
  
  function show_average_rating() {
    var rating_avg_number = $("#rating-average").text();
    var rating_avg_title = $("#rating-average-title").text();
    var className = "";
  
    $("#rating-container-hook").attr("title", rating_avg_title);
  
    console.log(rating_avg_number);
  
    if (rating_avg_number == 0) className = "symbol-empty";
    else if (rating_avg_number < 2) className = "symbol-filled rating1";
    else if (rating_avg_number < 2.7) className = "symbol-filled rating2";
    else if (rating_avg_number < 3.4) className = "symbol-filled rating3";
    else if (rating_avg_number >= 3.4 && rating_avg_number < 4)
      className = "symbol-filled rating4";
    else className = "symbol-filled rating5";
  
    $("#visible_rating_average").addClass(className);
  }
  
  function show_fav_function() {
    var $favcount = $("#fav-count");
  
    $("#fav-star").on("click", function () {
      var previous_favcount = parseInt($favcount.text());
  
      if ($(this).hasClass("active") == true)
        $favcount.text(parseInt($favcount.text()) - 1);
      else $favcount.text(parseInt($favcount.text()) + 1);
  
      $(this).toggleClass("active");
  
      var data = {
        text_id: $("#text-practice-view").attr("data-text-id"),
      };
  
      $.ajax({
        type: "POST",
        url: "/texts/toggle_favorite/",
        data: data,
        cache: false,
        success: function (data) {
          if (data == -1) {
            alert("You have to be logged in to favorite this text");
            $favcount.text(previous_favcount);
            $("#fav-star").removeClass("active");
          } else $favcount.text(data);
        },
        error: function (httpRequest, textStatus, errorThrown) {
          console.log(httpRequest);
          console.log(textStatus);
          console.log(errorThrown);
          $(".results")
            .html("an error occured. we could not save your score")
            .slideDown();
        },
      });
    });
  }
  
  var current_position_diff = new Object();
  var $workspace;
  var $current;
  function cache_elements() {
    $current = $(".current");
    $workspace = $(".workspace");
  
    var offset_current = $current.offset();
    var offset_workspace = $workspace.offset();
    current_position_diff.top = offset_current.top - offset_workspace.top;
    current_position_diff.left = offset_current.left - offset_workspace.left;
  }
  
  function restart() {
    //wird beim start und beim klick auf "restart" aufgerufen
    //ruft initialisierungsfunktionen auf und setzt werte zurück auf den startwert
  
    word_string = "";
    words = "";
    row1_string = "";
    word_pointer = 0;
    user_input_stream = "";
    cd_started = 0;
    previous_position_top = 0;
    row_counter = 0;
    eingabe = "";
    start_time = 0;
    end_time = 0;
    start_time_set = 0;
  
    //just to count everything if the ajax-call fails
    error_wpm = 0;
    error_keystrokes = 0;
    error_correct = 0;
    error_wrong = 0;
    backspace_counter = 0;
  
    ended = false;
    started = false;
  
    scrolldiff = 0;
    startpos = 0;
    last_scroll = 0;
  
    $("#timer").text("1:00");
    $("#ajax-load").css("display", "block");
    $("#reload-box").css("display", "none");
    $("#row1").css("top", "1px");
    $("#timer").removeClass("off");
    $("#time").html("00:00").fadeIn();
  
    window.clearInterval(setval);
    setval = "";
  
    setTimeout(function () {
      $inputfield.val("").show().focus();
    }, 250);
  
    $workspace.slideDown();
    $(".results").slideUp();
    $(".highlight-wrong").removeClass("highlight-wrong");
    $(".highlight").removeClass("highlight");
    $(".wrong").removeClass("wrong");
    $(".correct").removeClass("correct");
    $row1.animate({ scrollTop: 0 }, "2000", "swing");
  
    $('#row1 span[wordnr="0"]').addClass("highlight");
    if (startpos == 0) startpos = $('#row1 span[wordnr="0"]').offset().top;
    if (original_placeholder != "")
      $("#text_typed").attr("placeholder", original_placeholder);
  
    lines = $(".original").text().split("\n");
  
    words = [];
    $(lines).each(function (i, e) {
      words_in_this_line = e.split(" ");
      $(words_in_this_line).each(function (i, e) {
        if (e.length > 0) words.push(e);
      });
    });
  }
  
  function end_test() {
    clearInterval(timer);
    ended = new Date();
  
    $inputfield.slideUp();
    $workspace.slideUp();
    $("#time").slideUp();
    $(".keystrokes").html("");
    scrolldiff = 0;
  
    $current.html("");
  
    $("#saving-score-message").show();
    $(".results").slideDown();
  
    var data = {
      original: $(".original").text(),
      input: user_input_stream,
      time_taken: ended - started,
      text_id: $("#text-practice-view").attr("data-text-id"),
      backspace_counter: backspace_counter,
      wrong_words: $(".workspace .wrong").length,
      correct_words: $(".workspace .correct").length,
    };
  
    $.ajax({
      type: "POST",
      url: "/texts/save_result/",
      data: data,
      cache: false,
      success: function (statistics) {
        $("#saving-score-message").hide();
        $(".results").html(statistics).slideDown();
        var $cc = $(".completed-count");
        var count = parseInt($cc.text());
        $cc.text(count + 1);
        rating_module();
      },
      error: function (httpRequest, textStatus, errorThrown) {
        console.log(httpRequest);
        console.log(textStatus);
        console.log(errorThrown);
        $("#saving-score-message").hide();
        $(".results")
          .html("an error occured. we could not save your score")
          .slideDown();
      },
    });
  
    return true;
  }
  
  function evaluate() {
    eingabe = $inputfield.val().split(" ");
    user_input_stream += eingabe[0] + " ";
  
    $row1_span_wordnr.removeClass("highlight-wrong");
  
    if (eingabe[0] == words[word_pointer]) {
      $row1_span_wordnr.removeClass("highlight").addClass("correct");
      error_correct++;
      error_keystrokes += words[word_pointer].length;
      error_keystrokes++; //für jedes SPACE
    } else {
      $row1_span_wordnr.removeClass("highlight").addClass("wrong");
      error_wrong++;
      error_keystrokes -= Math.round(words[word_pointer].length / 2);
    }
  }
  
  //wartet auf Eingaben die im #inputfield erfolgen
  function activate_keylistener() {
    var android_spacebar = 0;
  
    // restart with 'r'
    $(document).keydown(function (event) {
      if (ended != false) {
        if (event.which == 82) restart();
      }
  
      //F5 pressed
      if (event.which == 116) {
        clearInterval(timer);
        ended = new Date();
  
        restart();
        return false;
      }
    });
  
    // Android/mobile specific function to check if inputfield contains a space-char, as the keyup function doesn't work on Android+Chrome
    $(window).on("touchstart", function (event) {
      $("input#inputfield").on("input", function (event) {
        var value = $("input#inputfield").val();
  
        if (value.indexOf(" ") != -1) {
          android_spacebar = 1;
        } else {
          android_spacebar = 0;
        }
      });
    });
  
    // last cpm logging
    var last_cpm = [];
  
    // on keypress
    $inputfield.keyup(function (event) {
      // lets start!
      if (!started && event.which != 116) {
        started = new Date();
  
        var lastest_cpm_schnitt = 0;
        var max_cpm = 0;
  
        timer = setInterval(function () {
          var now = new Date();
          var diff = now - started;
          var seconds = Math.floor((diff / 1000) % 60);
          var minutes = Math.floor(diff / 1000 / 60);
          if (seconds < 10) seconds = "0" + seconds;
          if (minutes < 10) minutes = "0" + minutes;
  
          //$('.workspace').text().length
          var cpm_str = "";
          var current_text = user_input_stream + "" + $inputfield.val();
          var cpm = Math.ceil((current_text.length / diff) * 1000 * 60);
          last_cpm.push(cpm);
  
          var bg_red = "rgba(255,0,0,.4);";
          var bg_darkred = "rgba(255,0,0,.8);";
          var bg_green = "rgba(0,255,0,.4);";
          var bg_darkgreen = "rgba(0,255,0,.8);";
  
          var speed_bar = "";
  
          if (last_cpm.length > 30 && diff > 5000) {
            var cpm_schnitt = 0;
            var i = last_cpm.length;
            while (i--) {
              cpm_schnitt += last_cpm[i];
            }
            cpm_schnitt /= last_cpm.length;
  
            if (cpm_schnitt > max_cpm) max_cpm = cpm_schnitt;
  
            //cpm_str='<span class="cpm">'+Math.round(cpm_schnitt)+'</span> <span class="cpm_text">keystrokes per minute</span>';
            last_cpm.shift();
  
            var background = bg_green;
            if (lastest_cpm_schnitt != 0) {
              if (lastest_cpm_schnitt > cpm_schnitt) background = bg_red;
              if (lastest_cpm_schnitt > cpm_schnitt + 2) background = bg_darkred;
              if (lastest_cpm_schnitt < cpm_schnitt - 2)
                background = bg_darkgreen;
            }
            lastest_cpm_schnitt = cpm_schnitt;
            speed_bar =
              '<div style="width:100%; height:12px; border:1px solid rgba(0,0,0,.1);"><div style="background:' +
              background +
              " height:10px; width:" +
              Math.ceil((cpm_schnitt / max_cpm) * 100) +
              '%;"></div></div>';
          }
  
          $("#time").html(minutes + ":" + seconds);
          //$('.keystrokes').html(''+cpm_str+''+speed_bar);
  
          //var wpm=Math.round(words.length/time*10)/10*60;
        }, 100);
      }
  
      // already finished?
      if (ended) return;
  
      // current word
      $row1_span_wordnr = $('#row1 span[wordnr="' + word_pointer + '"]');
  
      // increase backspace-count
      if (event.which == 8) backspace_counter++;
  
      // space pressed, but empty input
      if (
        (event.which == input_key_value && $inputfield.val() == " ") ||
        (event.which == 13 && $inputfield.val() == " ")
      ) {
        $inputfield.val("");
      }
      // space pressed
      else if (
        event.which == input_key_value ||
        android_spacebar == 1 ||
        event.which == 13
      ) {
        //event.which == 32 => SPACE-Taste
        if (original_placeholder == "") {
          original_placeholder = $("#text_typed").attr("placeholder");
          $("#text_typed").attr("placeholder", "");
        }
  
        //evaluate
        evaluate();
  
        //process
        word_pointer++;
  
        // this was the last word?
        if (word_pointer == words.length) {
          end_test();
        } else {
          $row1_span_wordnr = $('#row1 span[wordnr="' + word_pointer + '"]');
          $row1_span_wordnr.addClass("highlight");
  
          var scroll =
            $row1_span_wordnr.offset().top - startpos + $row1.scrollTop();
          //console.log("scroll: "+scroll);
          //console.log("last_scroll: "+last_scroll);
          if (scroll > last_scroll + 5) {
            $row1.animate({ scrollTop: scroll }, "2000", "swing");
            last_scroll = scroll;
          }
  
          //erase
          $("#inputstream").text(user_input_stream);
          //$inputfield.val(eingabe[1]);
          if (eingabe[1]) {
            $current.html(eingabe[1]);
            $inputfield.val(eingabe[1]);
          } else {
            $current.html("");
            $inputfield.val("");
          }
        }
      }
      // typing process
      else {
        //prüfe ob user das wort gerade falsch schreibt (dann zeige es rot an, damit user direkt korrigieren kann)
  
        if ($(".highlight").length > 0) {
          var t =
            $(".highlight").offset().top +
            $(".highlight").height() -
            $(document).scrollTop() +
            5;
          //$('.hightlight').offset().top
          $current
            .text($inputfield.val())
            .css({
              top: t,
              left: $(".highlight").offset().left,
            })
            .show();
        }
  
        // typing currently wrong or right?
        if (
          $inputfield.val().replace(/\s/g, "") ==
          words[word_pointer].substr(
            0,
            $inputfield.val().replace(/\s/g, "").length
          )
        ) {
          $row1_span_wordnr.removeClass("highlight-wrong").addClass("highlight");
        } else {
          $row1_span_wordnr.removeClass("highlight").addClass("highlight-wrong");
        }
  
        // typing last word?
        if (word_pointer == words.length - 1) {
          if (words[word_pointer].length == $inputfield.val().length) {
            evaluate(); // evaluate last word
            end_test();
          }
        }
  
        //console.log(words[word_pointer]);
        //console.log($inputfield.val().replace(/\s/g, ''), words[word_pointer].substr(0, $inputfield.val().replace(/\s/g, '').length),($inputfield.val().replace(/\s/g, '') == words[word_pointer].substr(0, $inputfield.val().replace(/\s/g, '').length)) );
  
        //console.log(eingabe[0], words[word_pointer], (eingabe[0] == words[word_pointer]));
      }
    });
  }
  
  function save_as_favorite() {
    $.ajax({
      type: "POST",
      url: "/tp/update_text_favorite/",
      data: { text_id: $("#text-practice-view").attr("data-text-id") },
      cache: false,
      success: function (r) {
        if (r == "1") {
          $(".favorite-icon")
            .removeClass("glyphicon-star-empty")
            .addClass("glyphicon-star");
          var count = parseInt($(".favcount").text());
          $(".favcount").text(count + 1);
        } else {
          $(".favorite-icon")
            .addClass("glyphicon-star-empty")
            .removeClass("glyphicon-star");
          var count = parseInt($(".favcount").text());
          $(".favcount").text(count - 1);
        }
      },
      error: function (httpRequest, textStatus, errorThrown) {
        console.log(httpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      },
    });
  }
  
  function rating_module() {
    var rating_int = parseInt($("#my-text-rating").text());
    $("#star-rating").val(rating_int - 1);
    $("input#star-rating").rating();
    $("input#star-rating").on("change", function () {
      //save rating
      var rating = $(this).val();
      var text_id = $("#text-practice-view").attr("data-text-id");
  
      $.ajax({
        type: "POST",
        url: "/text/save_text_rating/",
        data: { text_id: text_id, rating: rating },
        cache: false,
        success: function (r) {
          /*
                    if($('.ur_thx').length==0) $('.user_rating').append($('<div class="ur_thx" style="text-align: left;text-shadow: none;font-size: 12px;color:#282828;"></div>'));
                    $('.ur_thx').html('thank you').fadeIn();
                    setTimeout(function(){
                        $('.ur_thx').fadeOut();
                    },1000);
                    */
        },
        error: function (httpRequest, textStatus, errorThrown) {
          console.log(httpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        },
      });
    });
  }
  
  function get_current_time() {
    var d = new Date();
    return d.getTime();
  }
  
  //String "Trim" Function
  function trim11(str) {
    str = str.replace(/^\s+/, "");
    for (var i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
  }
  