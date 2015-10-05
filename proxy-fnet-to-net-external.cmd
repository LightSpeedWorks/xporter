@pushd %~dp0
@if "%XPORTER_PROXY_FOLDER%" == "" (
	set XPORTER_PROXY_FOLDER=work
	if not exist work mkdir work
)
pause
echo %XPORTER_PROXY_FOLDER%
node fnet-net %XPORTER_PROXY_FOLDER% 8080 %XPORTER_PROXY_EXTERNAL%
@pause
@popd
