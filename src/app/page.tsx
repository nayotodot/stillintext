"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import iconv from "iconv-lite";

export default function Home() {
	const [encodeText, setEncodeText] = useState("");
	const [decodeText, setDecodeText] = useState("");

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(
		() => {
			const elements = formRef.current?.elements!;
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i] as HTMLElement;
				element.style.height = "auto";
				element.style.height = `${element.scrollHeight}px`;
			}
		}
	);

	function utf8ToShiftJIS(text: string): string {
		const textEncoder = new TextEncoder();
		const uint8Array = textEncoder.encode(text);
		const result = iconv.decode(uint8Array, "shift-jis");
		return result;
	}

	function shiftJISToUtf8(text: string): string {
		const buffer = iconv.encode(text, "shift-jis");
		const textDecoder = new TextDecoder();
		const result = textDecoder.decode(buffer);
		return result;
	}

	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		const name = event.target.name;
		const value = event.target.value;
		switch (name) {
			case "encode":
				setEncodeText(value);
				setDecodeText(utf8ToShiftJIS(value));
				break;
			case "decode":
				setDecodeText(value);
				setEncodeText(shiftJISToUtf8(value));
				break;
			default:
				alert("Unknown textarea");
				break;
		}
	}

	return (
		<div id="wrapper">
			<header id="header">
				<h1>Still in Text</h1>
				<p>Convert to glitch text (Shift_JIS)</p>
			</header>
			<div id="main">
				<form className="grid" autoCapitalize="off" autoComplete="off" ref={formRef}>
					<label>
						<textarea name="encode" value={encodeText} onChange={handleChange} rows={3} placeholder="テキスト入力" />
					</label>
					<label>
						<textarea name="decode" value={decodeText} onChange={handleChange} rows={3} placeholder="繝�繧ｭ繧ｹ繝亥�･蜉�" />
					</label>
				</form>
			</div>
			<footer id="footer">
				<p className="copyright">&copy; {(new Date()).getFullYear()} <a href="https://nayoto.net/">NAYOTO.NET</a></p>
			</footer>
		</div>
	);
}
