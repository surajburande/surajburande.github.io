var rsvpId, regex = { 'name': /^[a-zA-Z0-9\s\.-@&]+$/, 'email': /^[a-zA-Z0-9][\w\+\.\*-]+@\w+[\w\.]*\.[a-zA-Z]{2,3}$/, 'phone': /^\+*[0-9]{8,15}$/, 'image': /(\.jpg|\.jpeg|\.png|\.gif)$/i, 'audio': /(\.mp3|\.wav|\.ogg|\.aac|\.m4a)$/i, 'video': /(\.mp4|\.webm|\.ogg|\.mov)$/i };
const mapModal = document.getElementById('map_view');
if (mapModal) {
    mapModal.addEventListener('show.bs.modal', event => {
        var triggerButton, triggerButtonId, mapLink, lat, lng;
        triggerButton = event.relatedTarget;
        triggerButtonId = triggerButton.getAttribute('id');
        if (mapLinks.hasOwnProperty(triggerButtonId)) {
            mapLink = mapLinks[triggerButtonId];
            lat = parseFloat(mapLink['lat']);
            lng = parseFloat(mapLink['lon']);
            document.getElementById('map_view_direction').setAttribute("onclick", `window.open('https://www.google.com/maps?daddr=${lat},${lng}')`);
            var macc = { lat: lat, lng: lng };
            var map = new google.maps.Map(document.getElementById('google-map-view'), { zoom: 15, center: macc });
            var marker = new google.maps.Marker({ position: macc, map: map });
        }
    });
}

function loadCountdownTimer() {
    var date, difference;
    date = new Date(eventDate);
    date = date.getTime() + ((date.getTimezoneOffset() + 330) * 60 * 1000);
    date = new Date(date);
    difference = date.getTime() - new Date().getTime();
    setInterval(() => {
        coundownTimer(difference);
        difference -= 1000;
    }, 1000);
}

function coundownTimer(difference) {
    var diffDate, sec, min, hrs, day;
    if (difference < 1000) {
        sec = min = hrs = day = 0;
        if (difference > (24 * 60 * 60 * 1000 * -1)) {
            jQuery('.countdown-section .today-banner, .countdown-section .countdown-banner').toggleClass('d-none');
        } else {
            jQuery('.countdown-section .today-banner, .countdown-section .countdown-banner').addClass('d-none');
            jQuery('.old-banner').removeClass('d-none');
        }
    } else {
        diffDate = new Date(difference);
        sec = diffDate.getSeconds();
        min = diffDate.getMinutes();
        hrs = diffDate.getHours();
        day = diffDate.getDate() + (diffDate.getMonth() * 30) + ((diffDate.getFullYear() - 1970) * 365);
    }
    jQuery('.countdown-section .timer.days').html((day < 10) ? `0${day}` : day);
    jQuery('.countdown-section .timer.hours').html((hrs < 10) ? `0${hrs}` : hrs);
    jQuery('.countdown-section .timer.min').html((min < 10) ? `0${min}` : min);
    jQuery('.countdown-section .timer.sec').html((sec < 10) ? `0${sec}` : sec);
    // console.log(`sec - ${sec}, min - ${min}, hrs - ${hrs}, day - ${day}`);
}

function reorderGallery() {
    var galleryGrid = jQuery('#photo_gallery .grid');
    if (galleryGrid.length > 0 && galleryGrid.children().length > 0) {
        waterfall(galleryGrid.get(0));
    }
}

function collapseHamburger() {
    jQuery('.navbar .navbar-toggler').trigger('click');
}

function adjustLogo() {
    var fixed_logo_themes = ['theme16', 'theme17', 'theme18', 'theme19', 'theme20'];
    if (fixed_logo_themes.includes(siteTheme)) {
        if (window.matchMedia("(min-width: 991px)").matches) {
            if (jQuery(window).scrollTop() > 50) {
                jQuery('#header-logo').attr('style', 'top:0px !important;width:100px !important;');
            } else {
                jQuery('#header-logo').attr('style', 'top:10px !important;width:auto !important;');
            }
        } else if (window.matchMedia("(min-width: 768px)").matches) {
            if (jQuery(window).scrollTop() > 50) {
                jQuery('#header-logo').attr('style', 'top:0px !important;width:100px !important;');
            } else {
                jQuery('#header-logo').attr('style', 'top:10px !important;width:150px !important;');
            }
        } else {
            if (window.matchMedia("(min-width: 768px)").matches) {
                jQuery('#header-logo').attr('style', 'width:85px !important;');
            }
        }
    }
}

function initCurtains() {
    if (layout == 3) {
        LoadCurtains();
        jQuery('.curtains').curtain({
            scrollSpeed: 400,
            curtainLinks: '.curtain-links',
        });
    }
}

function initiateSite() {
    initiateAudio();
    jQuery('#arrival_date, #departure_date').datetimepicker({ defaultTime: '16:00' });
}

function initiateAudio() {
    var initAudio = true, search, searches = window.location.search.substring(1).split('&');
    for (var i = 0; i < searches.length; i++) {
        search = searches[i].split('=');
        if (search[0] && search[1] && search[0] == 'view' && search[1] == 'mobile') {
            initAudio = false;
        }
    }
    if (initAudio) {
        toggleAudio();
    }
}

function toggleAudio() {
    if (jQuery("#mymusic").length > 0) {
        if (jQuery("#mymusic").get(0).paused) {
            jQuery("#mymusic").get(0).play();
        } else {
            jQuery("#mymusic").get(0).pause();
        }
    }
    resetAudioState();
}

function resetAudioState() {
    if (jQuery("#mymusic").length > 0) {
        setTimeout(() => {
            jQuery('.play-music .thumb-image').addClass('d-none');
            var audioId = 'thumb-image-' + ((jQuery("#mymusic").get(0).paused) ? 'off' : 'on');
            var btnTitle = 'Click to ' + (jQuery("#mymusic").get(0).paused ? 'un' : '') + 'mute';
            jQuery('.play-music, .play-music #' + audioId).removeClass('d-none');
            jQuery('.play-music').attr('title', btnTitle);
        }, 2000);
    }
}

function loadElementToShow(step) {
    var nextImg, nextIndex, currentIndex, currentUrl, allImages = [];
    jQuery.each(jQuery('#photo_gallery .gallery-image'), function (key, value) {
        allImages.push(jQuery(value).attr('src'));
    });
    currentUrl = jQuery('#galleryModal .modal-body .img-modal').attr('src');
    currentIndex = allImages.indexOf(currentUrl);
    if (step == -1) {
        nextIndex = (currentIndex == 0) ? allImages.length - 1 : currentIndex - 1;
    } else {
        nextIndex = (currentIndex == (allImages.length - 1)) ? 0 : currentIndex + 1;
    }
    nextImg = allImages[nextIndex];
    jQuery('#galleryModal .modal-body .img-modal').attr('src', nextImg);
}

function loadGalleryModal(url) {
    jQuery('#galleryModal .modal-body .img-modal').attr('src', url);
    jQuery('#galleryModal').modal('show');
}

function verifyPassword() {
    if (!password) {
        setTimeout(() => { jQuery('#loading').hide(); }, 2000);
    } else {
        var passwordText = prompt("Please enter the password to continue", "");
        jQuery.ajax({
            type: "POST", data: { 'url': regurl, 'password': passwordText }, url: base_url + "api/website/password",
            success: function (data) {
                if (data.result.toLowerCase() == 'success') { jQuery('#loading').hide(); }
                else { alert('Invalid Password!'); verifyPassword(); }
            }
        });

    }
}

function changeAttendingStatus(element) {
    var status = jQuery(element).val();
    if (status == 'attending') {
        jQuery('.rsvp-form').removeClass('d-none');
    } else {
        jQuery('.rsvp-form').addClass('d-none');
    }
}

function changeSectionStatus(element) {
    var name = jQuery(element).attr('name');
    if (name == 'accomodate_status') {
        changeAccomodationStatus(element);
    } else {
        var status = jQuery(element).val();
        var additionalElement = jQuery(`.${name.replace('_status', '') + '_additional'}`);
        if (additionalElement.length > 0) {
            if (status == 'other') {
                additionalElement.removeClass('d-none');
            } else {
                additionalElement.addClass('d-none');
            }
        }
    }
}

function changeAccomodationStatus(element) {
    var status = jQuery(element).val();
    if (status == 'needed') {
        jQuery('.accomodation_additional').removeClass('d-none');
    } else {
        jQuery('.accomodation_additional').addClass('d-none');
    }
}

function updateInputText(element) {
    var elemId = jQuery(element).attr('id');
    var value = jQuery(element).val();
    var inputRegEx = /[^0-9\+]/g;
    jQuery(element).val(value.replace(inputRegEx, ''));
}

function checkRsvpExists(element) {
    var email = jQuery('#rsvp-email').val(), phone = jQuery('#rsvp-phone').val();
    if ((typeof email == 'undefined' || email == null || email == '') && (typeof phone == 'undefined' || phone == null || phone == '')) {
        rsvpId = '';
        return null;
    }
    var data = { email: email, phone: phone, url: url };
    jQuery.ajax({
        type: "POST", data: data, url: rsvp_url + "api/check",
        success: function (data) {
            if (data.status == 'success') {
                rsvpId = data.rsvp_id;
            }
        }
    });
}

function sendRsvp() {
    var rsvpData = getRsvpData();
    var allErrors = jQuery('.error-red-text').length, hiddenErrors = jQuery('.error-red-text.d-none').length;
    if (allErrors === hiddenErrors) {
        jQuery.ajax({
            type: "POST", data: rsvpData, url: rsvp_url + "api/save",
            success: function (data) {
                if (data.status == 'success') {
                    rsvpId = data.id;
                    uploadFiles();
                }
            }, error: function (data) {
                console.log('error', data);
            }
        });
    }
}

function getRsvpData() {
    var i, element, value, status, rsvpData = { 'url': regurl };
    var guestDetails = (rsvpSection.guest_details && rsvpSection.guest_details.visible_options) ? rsvpSection.guest_details.visible_options : [];
    var guestMessage = (rsvpSection.guest_message && rsvpSection.guest_message.show && rsvpSection.guest_message.show == 'yes' && rsvpSection.guest_message.visible_options) ? rsvpSection.guest_message.visible_options : [];
    var attendingStatus = (rsvpSection.attending_status && ((typeof rsvpSection.attending_status == 'string' && rsvpSection.attending_status == 'yes') || (typeof rsvpSection.attending_status != 'string' && rsvpSection.attending_status.show && rsvpSection.attending_status.show == 'yes' && rsvpSection.attending_status.visible_options))) ? rsvpSection.attending_status.visible_options : [];
    var guestCount = (rsvpSection.no_of_guests && ((typeof rsvpSection.no_of_guests == 'string' && rsvpSection.no_of_guests == 'yes') || (typeof rsvpSection.no_of_guests != 'string' && rsvpSection.no_of_guests.show && rsvpSection.no_of_guests.show == 'yes'))) ? 'yes' : '';
    var arrDepDetails = (rsvpSection.arrival_departure_details && rsvpSection.arrival_departure_details.visible_options) ? rsvpSection.arrival_departure_details.visible_options : [];
    if (typeof rsvpId != 'undefined' && rsvpId != null && rsvpId != '')
        rsvpData.id = rsvpId;
    jQuery('.error-red-text').addClass('d-none');
    for (i = 0; i < guestDetails.length; i++) {
        element = guestDetails[i].toLowerCase();
        value = jQuery(`#rsvp-${element}`).val();
        if (typeof value == 'undefined' || value == null || value == '' || !regex[element].test(value)) {
            jQuery(`.rsvp-${element}_error`).removeClass('d-none');
        } else {
            rsvpData[element] = value;
        }
    }
    for (i = 0; i < guestMessage.length; i++) {
        element = guestMessage[i].toLowerCase();
        if (element == 'text') {
            rsvpData['message'] = jQuery('#rsvp-message').val();
        }
    }
    if (attendingStatus.length > 0) {
        var attending = jQuery('input[name="stats_attend"]:checked').val();
        if (typeof attending == 'undefined' || attending == null || attending == '')
            jQuery(`.stats_attend-error`).removeClass('d-none');
        else {
            jQuery(`.stats_attend-error`).addClass('d-none');
            rsvpData['status'] = attending;
        }
    }
    if (rsvpData['status'] != 'attending')
        return rsvpData;
    if (guestCount == 'yes') {
        rsvpData['no_guests'] = jQuery('#guest_count').val();
    }
    rsvpData.arrival = {};
    rsvpData.departure = {};
    for (i = 0; i < arrDepDetails.length; i++) {
        if (arrDepDetails[i].indexOf('arrival') === 0)
            rsvpData.arrival[arrDepDetails[i]] = jQuery(`.rsvp-wrapper #${arrDepDetails[i]}`).val();
        if (arrDepDetails[i].indexOf('departure') === 0)
            rsvpData.departure[arrDepDetails[i]] = jQuery(`.rsvp-wrapper #${arrDepDetails[i]}`).val();
    }
    if (rsvpSection.accomodation_details && rsvpSection.accomodation_details.show == 'yes') {
        status = jQuery('input[name="accomodate_status"]:checked').val();
        rsvpData.accomodation_status = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.accomodation_status == 'needed')
            rsvpData.accomodation_details = jQuery('#additional_details').val();
    }
    if (rsvpSection.meal_preference && rsvpSection.meal_preference.show == 'yes') {
        status = jQuery('input[name="meal_status"]:checked').val();
        rsvpData.meal = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
    }
    if (rsvpSection.allergic && rsvpSection.allergic.show == 'yes') {
        status = jQuery('input[name="allergic_status"]:checked').val();
        rsvpData.allergic = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.allergic == 'other')
            rsvpData.allergic_other = jQuery('#allergic_details').val();
    }
    if (rsvpSection.main_course && rsvpSection.main_course.show == 'yes') {
        status = jQuery('input[name="mainCourse_status"]:checked').val();
        rsvpData.main_course = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
    }
    if (rsvpSection.custom_one && rsvpSection.custom_one.show == 'yes') {
        status = jQuery('input[name="customOne_status"]:checked').val();
        rsvpData.custom_one = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.custom_one == 'other')
            rsvpData.custom_one_other = jQuery('#customOne_details').val();
    }
    if (rsvpSection.custom_two && rsvpSection.custom_two.show == 'yes') {
        status = jQuery('input[name="customTwo_status"]:checked').val();
        rsvpData.custom_two = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.custom_two == 'other')
            rsvpData.custom_two_other = jQuery('#customTwo_details').val();
    }
    if (rsvpSection.custom_three && rsvpSection.custom_three.show == 'yes') {
        status = jQuery('input[name="customThree_status"]:checked').val();
        rsvpData.custom_three = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.custom_three == 'other')
            rsvpData.custom_three_other = jQuery('#customThree_details').val();
    }
    return rsvpData;
}

function showSelectedContent(element, type) {
    var message = '', fileTypeRegEx = regex[type];
    jQuery(`.rsvp-message_error`).addClass('d-none').html(message);
    if (element.files.length < 1) {
        jQuery(`.attached-file-info[data-attr="${type}"]`).addClass('d-none');
        jQuery(`.attached-file-info[data-attr="${type}"] span`).html('');
        return false;
    }
    if (!fileTypeRegEx.test(element.files[0].name)) {
        message = 'Please upload a valid file type. Allowed formats ';
        switch (type) {
            case 'image':
                message += '(JPG,JPEG,PNG,GIF)';
                break;
            case 'audio':
                message += '(MP3,WAV,OGG,AAC,M4A)';
                break;
            case 'video':
                message += '(MP4,WEBM,OGG,MOV)';
                break;
        }
    }
    if (message.length == 0) {
        var fileSize = 0;
        switch (type) {
            case 'image':
            case 'audio':
                fileSize = 5;
                break;
            case 'video':
                fileSize = 40;
                break;
        }
        if (element.files[0].size > (fileSize * 1024 * 1000)) {
            message += `Unable to upload ${type}. Please make sure ${type} is less than ${fileSize}MB`;
        }
    }
    if (message.length > 0) {
        jQuery(`.rsvp-message_error`).removeClass('d-none').html(message);
        return false;
    }
    jQuery(`.attached-file-info[data-attr="${type}"]`).removeClass('d-none');
    jQuery(`.attached-file-info[data-attr="${type}"] span`).html(element.files[0].name);
}

function removeSelectedContent(element) {
    var attachment = jQuery(element).parents('.attached-file-info');
    var type = attachment.attr('data-attr');
    attachment.find('span').html('');
    attachment.addClass('d-none');
    jQuery(`#${type}_upload`).val('');
}

function uploadFiles() {
    var fileUpload = false, formData = new FormData();
    if (jQuery('#image_upload').length && jQuery('#image_upload').val() != '') {
        formData.append('image', jQuery('#image_upload')[0].files[0]);
        fileUpload = true;
    }
    if (jQuery('#audio_upload').length && jQuery('#audio_upload').val() != '') {
        formData.append('audio', jQuery('#audio_upload')[0].files[0]);
        fileUpload = true;
    }
    if (jQuery('#video_upload').length && jQuery('#video_upload').val() != '') {
        formData.append('video', jQuery('#video_upload')[0].files[0]);
        fileUpload = true;
    }
    if (fileUpload) {
        formData.append('id', rsvpId);
        jQuery.ajax({
            type: 'POST', data: formData, contentType: false, cache: false, processData: false, url: rsvp_url + 'api/upload',
            success: function (data, textStatus, jqXHR) {
                if (data.status && data.status.toLowerCase() == 'success') {
                    showRsvpSuccess();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Some unexpected error! Try again later.');
                console.log(jqXHR);
            }
        });
    } else {
        showRsvpSuccess();
    }
}

function showRsvpSuccess() {
    jQuery('.remove-upload-attachment').trigger('click');
    jQuery('#host-rsvp-form').get(0).reset();
    alert('RSVP details saved successfully!');
    rsvpId = '';
}

jQuery(document)
    .ready(() => {
        verifyPassword();
        setTimeout(() => {
            adjustLogo();
            initCurtains();
            reorderGallery();
        }, 2000);
        initiateSite();
        loadCountdownTimer();

    })
    .on('click', 'ul.navbar-nav .nav-link', function () {
        setTimeout(() => {
            collapseHamburger();
        }, 200);
    })
    .on('click', '.thumb-image', function () {
        toggleAudio();
    })
    .on('click', '#photo_gallery .grid .gallery-image', function () {
        var url = jQuery(this).attr('src');
        loadGalleryModal(url);
    })
    .on('change', '#rsvp input[name="stats_attend"]', function () {
        changeAttendingStatus(this);
    })
    .on('change', '#rsvp input[name$="_status"]', function () {
        changeSectionStatus(this);
    })
    .on('keyup', '#rsvp #rsvp-phone, #rsvp #guest_count', function () {
        updateInputText(this);
    })
    .on('blur', '#rsvp #rsvp-email, #rsvp #rsvp-phone', function () {
        checkRsvpExists(this);
    })
    .on('submit', '#rsvp #host-rsvp-form', function (e) {
        e.preventDefault();
        jQuery('#rsvp #rsvp_submit').trigger('click');
    })
    .on('click', '#rsvp #rsvp_submit', function () {
        if (typeof rsvpId != 'undefined' && rsvpId != null && rsvpId != '') {
            jQuery('#rsvpConfirm').modal('show');
            return null;
        }
        sendRsvp();
    })
    .on("click", '#banner_section .sticky-image-wrapper', function () {
        scrollTo(0, 200);
    })
    .on("change", '#image_upload', function () {
        showSelectedContent(this, 'image');
    })
    .on("change", '#audio_upload', function () {
        showSelectedContent(this, 'audio');
    })
    .on("change", '#video_upload', function () {
        showSelectedContent(this, 'video');
    })
    .on("click", '.remove-upload-attachment', function () {
        removeSelectedContent(this);
    })
    .on("click", '#do-sumbit-rsvp', function () {
        sendRsvp();
        jQuery('#rsvpConfirm').modal('hide');
    });

jQuery(window)
    .scroll(function () {
        adjustLogo();
    });
