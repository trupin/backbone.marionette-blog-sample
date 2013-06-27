/**
 * User: rupin_t
 * Date: 6/27/13
 * Time: 5:42 PM
 */

/**
 * Custom the template loading.
 * Each template is downloaded from the server and the cached.
 * @param templateId
 */
Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
    if (!templateId) return '';
    var $t = $(templateId);
    if ($t.length)
        return $t.html();
    var template = '';
    $.ajax('/templates/' + templateId.replace('#', '').replace('-template', '') + '.html', { async: false })
        .done(function (data) { template = data; });
    return template;
};

/**
 * Custom the template rendering.
 * Use Handlebars instead of _.template
 * @param rawTemplate
 * @returns {*}
 */
Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    return Handlebars.compile(rawTemplate);
};

/**
 * Custom the renderer.
 * The renderer will now use the TemplateCache of Marionette
 * @param template
 * @param data
 */
Backbone.Marionette.Renderer.render = function(template, data){
    return Marionette.TemplateCache.get(template)(data);
};