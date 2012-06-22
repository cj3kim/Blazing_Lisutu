window.Lilo = window.Lilo ||{};
  Lilo.layouts = #{@layouts.to_son};
  Lilo.url = #{@url.to_json}
  Lilo.facebook_appi_key = #{FACEBOOK_CONF.api_key.to_json}

  $(document.body).ready(function() {
    Lilo.init_app(Lilo.facebook_api_key);
  });
