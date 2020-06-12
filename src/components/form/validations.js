import * as yup from 'yup';
import * as tools from '../../tools'; 

export function isCPF (cpf) {
    if ( !cpf || cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222"  || cpf === "33333333333"  || cpf === "44444444444"  || cpf === "55555555555"  || cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888"  || cpf === "99999999999" ) {
        return false;
    }

    cpf = tools.removeSimbols(cpf);

    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10)) ) {
        return false;
    }

    soma = 0;

    for (var a = 1; a <= 10; a++) {
        soma = soma + parseInt(cpf.substring(a-1, a)) * (12 - a);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11) ) ) {
        return false;
    }

    return true;
}

export function yup_isCPF () {
    yup.addMethod(yup.string, 'isCPF', function(args) {
        const message = args || 'Forneça um CPF válido.';
        
        return this.test('isCPF', message, function(value) {
            const { path, createError } = this;
    
            let isOk = isCPF(value);
            
            return isOk || createError({ path, message });
        });
    });
}