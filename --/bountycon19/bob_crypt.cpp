#include <iostream>
#include <string>

std::string to_hex(uint32_t n){
	std::string output = "";
	for(uint32_t i=0;i<32;i+=4){
		uint32_t a = (n >> (28 - i)) & 0xf;
		char c;
		if(a >= 10) c = 'a' + (a%10);
		else c = '0' + a;
		output.push_back(c);
	}
	return output;
}

uint32_t char_to_int(char c){
	if(c >='0' && c<='9') return c -'0';
	else return c - 'a' + 10;
}

std::string str_to_hex(std::string str){
	std::string output = "";
	for(int i=0;i<str.length(); i+=4){
		output+= to_hex((str[i]<<24) | (str[i+1]<<16) | (str[i+2]<<8) | str[i+3]);
	}
	return output;
}

std::string from_hex(std::string str){
	std::string output = "";
	for(int i=0;i<str.length(); i+=2){
		char c = (char_to_int(str[i]) << 4) | char_to_int(str[i+1]);
		output.push_back(c);
	}
	return output;
}

std::string encrypt(std::string message, std::string key){
	if(key.length() != 16) throw("Bad Key Size");
	while(message.length()%4 != 0) message.push_back('0');
	std::string output = "";
	for(uint32_t i = 0; i<message.length(); i+=4){
		uint32_t a = 0;
		uint32_t b = 0;
		for(uint32_t j = 0; j<4; j++){
			a |= uint32_t(message[i+j]) << ((3-j) *8);
			b |= uint32_t(key[i%16+j]) << ((3-j) *8);
		}
		output+= to_hex(a ^ b);
	}

	return output;

}

std::string decrypt(std::string message, std::string key){
	if(message.length() % 8) throw("Bad Message Size");
	return from_hex(encrypt(from_hex(message), key));
}

int main(int argc, char ** argv){
	if(argc != 4){
		std::cout << "incorrect number of args\n";
		std::cout << "Usage: bob_crypt [enc|dec] <message> <key>\n";
		return 0;
	}

	std::string cmd = std::string(argv[1]);
	std::string message = std::string(argv[2]);
	std::string key = std::string(argv[3]);

	if(cmd == "enc"){
		std::cout << encrypt(message, key) << std::endl;
	}
	else{
		std::cout << decrypt(message, key) << std::endl;
	}

	return 0;
}
