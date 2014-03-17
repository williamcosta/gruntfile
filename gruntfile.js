module.exports = function(grunt) {

	'use strict';

    //carrega todos os registros de tarefas
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // configuração do projeto
    var gruntConfig = {

	    pkg: grunt.file.readJSON('package.json'),

        //verifica as alterações nos arquivos
        watch: {
            compass:{
                files: [ 'sass/**/*.scss' ],  
                tasks: [ 'compass' ]    
            },

            css: {
                files: [ 'stylesheets/**/*.css' ],  // local de onde pega os arquivos para concatena e minificar o CSS
                tasks: [ 'cssmin' ]    // Tarefa que executa a concatenação e a minificação
            },

            js: {
                files: ['js/**/*.js'],       // local de onde pega os arquivos para concatena e minificar o CSS
                tasks: [ 'uglify' ]     // Tarefa que executa a concatenação e a minificação
            },

            jpg: {
                files: ['images/**/*.jpg', 'imagens/**/*.jpg'],   // local de onde pega as imagens
                tasks: ['imageoptim']                       // Tarefa que executa a compressão dos JPGS
            },

            png: {
                files: ['images/**/*.png', 'imagens/**/*.png'],   // local de onde pega as imagens
                tasks: ['imageoptim']                       // Tarefa que executa a compressão dos PNGS
            }
        },

        //otimização de imagens na pasta "images" e "imagens"
	    imageoptim: {
  			myTask: {
    			src: ['images/', 'imagens/']
 		 	}
		},

        //minifica o CSS
        cssmin: {
            minify: {
                expand: true,
                cwd: 'stylesheets/',
                src: ['*.css', '!*.min.css'],
                dest: 'stylesheets/',
                ext: '.min.css'
            }
        },

        // concatena e minifica os Javacripts
        uglify: {
            options: {
                mangle: false,
                beautify: true
            },
            my_target: {
              files: [{
                    expand: true,
                    cwd: 'js/',
                    src: '/*.js',
                    dest: 'js/'
              }]
            }
        },

        // FTP Deploy
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'ftp.dominio.com.br',    //Endereço do FTP
                    port: 21,
                    authKey: '.'     //Pega o longin e senha do arquivo ".ftppass"
                },

                // Pasta de origem do projeto
                src: '.',

                // Pasta para aonde será enviado o projeto
                dest: '.',

                // Arquivos que serão ignorados pelo FTP Deploy
                exclusions: [
                    '../**/.DS_Store',
                    '../**/Thumbs.db',
                    '.json',
                    'notas-pitico.todo',
                    'pitico.sublime-project',
                    'pitico.sublime-workspace',
                    'sftp-config.json',
                    '.ftppass',
                    'gruntfile.js',
                    '.sublime-project',
                    '.todo',
                    'node_modules/*',
                    'css/*.css',
                    'js/*.js'
                ]
            }
        }



    };
    
    //variável que carrega o gruntinit
    grunt.initConfig(gruntConfig);
     
    // carregando plugins
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-ftp-deploy');

     
    // registrando tarefas
    grunt.registerTask('image', ['imageoptim'] );           // Comprimi as imagens das pastas configuradas
    grunt.registerTask('minify', ['cssmin', 'uglify'] );    // Minifica os arquivos css e js das pastas configuradas
    grunt.registerTask('default', ['watch'] );              // Faz todas as tarefas configuradas no Watch "CSSMIN, UGLIFY, IMAGEOPTIM", menos o "FTP DEPLOY"
    grunt.registerTask( 'deploy', ['ftp-deploy'] );         // registrando tarefa para deploy
};
