//Função para verificar se contém
function contem(t1, t2) {
  var b = false;
  for (var i = 0; i < t1.length; i++) {
    if (t1[i] == t2) {
      b = true;
    }
  }
  return b;
}
function contem1(t1, t2) {
  var b = false;
  for (var i = 0; i < t1.length; i++) {
    for (j = 0; j < t2.length; j++) {
      if (t1[i] == t2[j]) {
        b = true;
      }
    }
  }
  return b;
}

//Função para impressão dos dados
function imprimir(valor) {
  var texto = document.getElementById('text');
  texto.value += valor;
}

//Função para limpeza dos dados
function limpar(num) {
  var texto = document.getElementById('text');
  var texto1 = document.getElementById('text1');

  if (num == 1) {
    texto.value = '';
    texto1.value = '';
  }
  if (num == 2) {
    texto.value = texto.value.substring(0, texto.value.length - 1);
  }
}

//Função para separar os sinais dos números
function separar(aux) {
  var peg = '',
    novVet = new Array();
  var sinais = '+*/^%()',
    numeros = '-0123456789.',
    sin = '-+*/^%()';

  for (var i = 0; i < aux.length; i++) {
    if (contem(numeros, aux[i]) && i == 0) {
      peg += aux[i];
    }
    if (contem(numeros, aux[i]) && i > 0) {
      if (aux[i] == '-') {
        if (aux[i - 1] == '(') peg += aux[i];
        else peg += '#' + aux[i] + '#';
      } else peg += aux[i];
    } else if (contem(sinais, aux[i])) {
      if (aux[i] == '(') {
        if (contem(numeros, aux[i - 1]) && aux[i - 1] != '-') {
          peg += '#*#1#*#' + aux[i] + '#';
        } else if ((contem(sin, aux[i - 1]) && aux[i - 1] != '^') || i == 0) {
          peg += '1#*#' + aux[i] + '#';
        } else if (aux[i - 1] == '^') {
          peg += aux[i] + '#';
        }
      } else {
        if (contem(numeros, aux[i - 1])) peg += '#' + aux[i] + '#';
        else peg += aux[i] + '#';
      }
    }
  }

  if (peg[peg.length - 1] == '#') peg = peg.substring(0, peg.length - 1);
  else peg = peg;

  novVet = peg.split('#');
  return novVet;
}

//Função para transformar dados em notação polonesa
function polonesa(text) {
  var help = 0,
    cont = 0,
    h1 = 0,
    h2 = 0,
    pos = 0,
    helper = 0;
  var novVet1 = new Array(),
    vetsin = new Array();
  var vetnum = new Array(),
    novo = new Array();
  var s = '+-*/^%()',
    n = '-0123456789.';
  novVet1 = separar(text);

  for (var j = 0; j < novVet1.length; j++) {
    help = 0;
    if (novVet1[j] == '-') {
      help = 1;
    }
    if (contem1(n, novVet1[j]) && help != 1) {
      vetnum.push(novVet1[j]);
    }
    if (contem(s, novVet1[j]) || novVet1[j] == '-') {
      if (cont > 0) {
        if (helper > 0 && novVet1[j] != '(' && novVet1[j] != ')') {
          if (pos > 0 && novVet1[j] != '(' && novVet1[j] != ')') {
            h1 = s.indexOf(vetsin[cont - 1]);
            h2 = s.indexOf(novVet1[j]);

            if (h2 >= h1) {
              vetsin.push(novVet1[j]);
              cont++;
            } else if (h2 < h1) {
              for (k = vetsin.length - 1; k > -1; k--) {
                if (vetsin[k] == '(') {
                  vetsin.pop();
                  cont--;
                  break;
                } else {
                  vetnum.push(vetsin[k]);
                  vetsin.pop();
                  cont--;
                }
              }
              vetsin.push(novVet1[j]);
              cont++;
            }
          }
        } else if (
          helper == 0 &&
          novVet1[j] != '(' &&
          novVet1[j] != ')' &&
          pos > 0
        ) {
          vetsin.push(novVet1[j]);
          cont++;
          helper++;
        }
        if (novVet1[j] == '(') {
          pos++;
          vetsin.push(novVet1[j]);
          cont++;
        } else {
          if (novVet1[j] == ')') {
            for (l = vetsin.length - 1; l > -1; l--) {
              if (vetsin[l] == '(') {
                vetsin.pop();
                cont--;
                break;
              } else {
                vetnum.push(vetsin[l]);
                vetsin.pop();
                cont--;
              }
            }
            pos--;
          } else if (pos == 0) {
            h1 = s.indexOf(vetsin[cont - 1]);
            h2 = s.indexOf(novVet1[j]);

            if (h2 >= h1) {
              vetsin.push(novVet1[j]);
              cont++;
            } else if (h2 < h1) {
              for (k = vetsin.length - 1; k > -1; k--) {
                vetnum.push(vetsin[k]);
                vetsin.pop();
                cont--;
              }
              vetsin.push(novVet1[j]);
              cont++;
            }
          }
        }
      } else if (cont == 0) {
        vetsin.push(novVet1[j]);
        cont++;
      }
    }
  }

  //Mandando os números do vetor dos números
  for (k = 0; k < vetnum.length; k++) {
    if (vetnum[k] != ')') novo.push(vetnum[k]);
  }
  //Mandando os sinais do vetor dos sinais
  for (k = vetsin.length - 1; k > -1; k--) {
    novo.push(vetsin[k]);
  }

  return novo;
}

//Função para resolver dados do vetor
function resolve(ol) {
  var sin = '+*/-%^',
    z = true;
  var vetor = new Array(),
    resul = new Array();
  vetor = polonesa(ol);
  var conta = 0,
    resultado = 0;

  while (z == true) {
    if (vetor.length == 1) {
      resul = vetor;
      break;
    } else if (contem(sin, vetor[conta])) {
      resultado = res(vetor[conta - 2], vetor[conta - 1], vetor[conta]);

      vetor[conta] = 'm';
      vetor[conta - 1] = 'm';
      vetor[conta - 2] = resultado;

      for (p = 0; p < vetor.length; p++) {
        if (vetor[p] != 'm') resul.push(vetor[p]);
      }

      if (contem1(sin, resul)) {
        vetor = resul;
        resul = new Array();
        conta = -1;
      } else break;
    }
    conta++;
  }

  return resul;
}

//Resolução
function res(num1, num2, sinal) {
  var result = 0;
  if (sinal == '-') result = parseFloat(num1) - parseFloat(num2);
  if (sinal == '+') result = parseFloat(num1) + parseFloat(num2);
  if (sinal == '*') result = parseFloat(num1) * parseFloat(num2);
  if (sinal == '/') result = parseFloat(num1) / parseFloat(num2);
  if (sinal == '%') result = parseFloat(num1) % parseFloat(num2);
  if (sinal == '^') result = Math.pow(parseFloat(num1), parseFloat(num2));

  return result;
}

//Função para verificar dados digitados
function igual() {
  var texto = document.getElementById('text');
  var texto1 = document.getElementById('text1');
  var c = 0,
    c1 = 0;

  for (m = 0; m < texto.value.length; m++) {
    if (texto.value[m] == '(') c++;
    if (texto.value[m] == ')') c1++;
  }

  if (contem1(texto.value, 'qwertyuiopasdfghjklçzxcvbnm'))
    texto.value = 'Syntax Error';
  else {
    var vetRec = new Array(),
      vetpol = new Array();
    var sinais = '+*/^%()',
      conta = 0;
    var numeros = '-0123456789.';
    var txt = texto.value;

    if (txt != '') {
      if (c == c1) {
        vetpol = resolve(txt);
        texto1.value = vetpol;
      } else {
        if (contem(texto1.value, 'N') || contem(texto1.value, 'E') || c1 != c)
          texto1.value = 'Syntax Error';
        else texto1.value = vetpol;
      }
    } else texto1.value = '';
  }
}
