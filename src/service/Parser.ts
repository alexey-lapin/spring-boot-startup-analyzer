import ParseResult from "@/model/ParseResult";

export default interface Parser {
  parse(payloadString: string): ParseResult;
}
