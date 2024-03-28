<?php
/*
Plugin Name: ProspectBD Chatbot Plugin
Description: Add a chatbot to your WordPress website.
Version: 1.0.0
Author: Mehedi Hasan
*/

function my_chatbot_enqueue_scripts() {
    wp_enqueue_style('tailwind-css', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    wp_enqueue_style('my-chatbot-css', plugins_url('assets/css/style.css', __FILE__));
    wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js', array(), null, false);
    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/a0d9262eb8.js', array(), null, false);
    wp_enqueue_script('jsyaml', 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.0.0/js-yaml.min.js', array(), null, false);
    wp_enqueue_script('my-chatbot-vue', plugins_url('assets/js/vue.js', __FILE__), array('vue'), null, true);
}
add_action('wp_enqueue_scripts', 'my_chatbot_enqueue_scripts');

// Render chatbot
function my_plugin_add_html_to_home_page() {
    echo file_get_contents(plugin_dir_path(__FILE__) . 'templates/chatbot-templates.html');
}
add_action('wp_footer', 'my_plugin_add_html_to_home_page');